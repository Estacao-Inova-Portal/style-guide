function _instanceof(left, right) {
  if (
    right != null &&
    typeof Symbol !== "undefined" &&
    right[Symbol.hasInstance]
  ) {
    return !!right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

//======================================//
// Unimed Style Guide Scripts
//======================================//
//======================================//
// Universal variables
//======================================//
// All elements that can be focused
var FOCUSABLE_ELEMENTS = [
  'a[href]:not([tabindex^="-"]):not([inert])',
  'area[href]:not([tabindex^="-"]):not([inert])',
  "input:not([disabled]):not([inert])",
  "select:not([disabled]):not([inert])",
  "textarea:not([disabled]):not([inert])",
  "button:not([disabled]):not([inert])",
  'iframe:not([tabindex^="-"]):not([inert])',
  'audio:not([tabindex^="-"]):not([inert])',
  'video:not([tabindex^="-"]):not([inert])',
  '[contenteditable]:not([tabindex^="-"]):not([inert])',
  '[tabindex]:not([tabindex^="-"]):not([inert])'
]; //======================================//
// Global functions
//======================================//
//Convert a NodeList into an array

function toArray(collection) {
  return Array.prototype.slice.call(collection);
} //Query the DOM for nodes matching the given selector, scoped to context(or the whole document)

function $$(selector, context) {
  return toArray((context || document).querySelectorAll(selector));
} //Return an array of Element based on given argument(NodeList, Element or string representing a selector)

function collect(target) {
  if (NodeList.prototype.isPrototypeOf(target)) {
    return toArray(target);
  }

  if (Element.prototype.isPrototypeOf(target)) {
    return [target];
  }

  if (typeof target === "string") {
    return $$(target);
  }
} //Set the focus to the first element with `autofocus` or the first focusable child of the given element

function setFocusToFirstItem(node) {
  var focusableChildren = getFocusableChildren(node);
  var focused = node.querySelector("[autofocus]") || focusableChildren[0];

  if (focused) {
    focused.focus();
  }
} //Get the focusable children of the given element

function getFocusableChildren(node) {
  return $$(FOCUSABLE_ELEMENTS.join(","), node).filter(function (child) {
    return !!(
      child.offsetWidth ||
      child.offsetHeight ||
      child.getClientRects().length
    );
  });
} //Trap the focus inside the given element

function trapTabKey(node, event) {
  var focusableChildren = getFocusableChildren(node);
  var focusedItemIndex = focusableChildren.indexOf(document.activeElement); // If the SHIFT key is being pressed while tabbing (moving backwards) and
  // the currently focused item is the first one, move the focus to the last
  // focusable item from the dialog element

  if (event.shiftKey && focusedItemIndex === 0) {
    focusableChildren[focusableChildren.length - 1].focus();
    event.preventDefault(); // If the SHIFT key is not being pressed (moving forwards) and the currently
    // focused item is the last one, move the focus to the first focusable item
    // from the dialog element
  } else if (
    !event.shiftKey &&
    focusedItemIndex === focusableChildren.length - 1
  ) {
    focusableChildren[0].focus();
    event.preventDefault();
  }
} //Retrieve siblings from given element

function getSiblings(node) {
  var nodes = toArray(node.parentNode.childNodes);
  var siblings = nodes.filter(function (node) {
    return node.nodeType === 1;
  });
  siblings.splice(siblings.indexOf(node), 1);
  return siblings;
} // Toggle class

function toggleClass(target, cssClass) {
  var el = document.getElementById(target);
  el.classList.toggle(cssClass);
} // Lazy Load images and videos
// This function is called at the end of this JS file

function lazyload() {
  // Lazy load images
  var elements = Array.prototype.slice.call(
    document.querySelectorAll("[data-src]")
  );
  elements.forEach(function (element) {
    element.dataset.src ? (element.src = element.dataset.src) : null;
  }); // Lazy load videos

  if (document.getElementsByTagName("video")) {
    Array.prototype.slice
      .call(document.getElementsByTagName("video"))
      .forEach(function (element) {
        element.children[0].dataset.src && element.load();
      });
  }
} //======================================//
// Classes
//======================================//
//Modal controllers
//Modal controller specific global variables

var focusedBeforeDialog = ""; // Get all the elements that opens a modal

var modalOpeners = Array.from(document.querySelectorAll("[data-modal-show]")); //The modal class

var modalController =
  /*#__PURE__*/
  (function () {
    function modalController(node, targets) {
      _classCallCheck(this, modalController);

      this._show = this.show.bind(this);
      this._hide = this.hide.bind(this);
      this._maintainFocus = this._maintainFocus.bind(this);
      this._bindKeypress = this._bindKeypress.bind(this);
      this.container = node;
      this.dialog = node.querySelector('dialog, [role="dialog"]');
      this.role = this.dialog.getAttribute("role") || "dialog";
      this.useDialog =
        "show" in document.createElement("dialog") &&
        this.dialog.nodeName === "DIALOG";
      this._listeners = {};
      this.create(targets);
    }

    _createClass(modalController, [
      {
        key: "create",
        value: function create(targets) {
          // Keep a collection of nodes to disable/enable when toggling the dialog
          this._targets =
            this._targets || collect(targets) || getSiblings(this.container); // Set the `shown` property to match the status from the DOM

          this.shown = this.dialog.hasAttribute("open"); // Despite using a `<dialog>` element, `role="dialog"` is not necessarily
          // implied by all screen-readers (yet)
          // See: https://github.com/edenspiekermann/a11y-dialog/commit/6ba711a777aed0dbda0719a18a02f742098c64d9#commitcomment-28694166

          this.dialog.setAttribute("role", this.role);

          if (!this.useDialog) {
            if (this.shown) {
              this.container.removeAttribute("aria-hidden");
            } else {
              this.container.setAttribute("aria-hidden", true);
            }
          } else {
            this.container.setAttribute("data-modal-native", "");
          } // Keep a collection of dialog openers, each of which will be bound a click
          // event listener to open the dialog

          this._openers = $$('[data-modal-show="' + this.container.id + '"]');

          this._openers.forEach(
            function (opener) {
              opener.addEventListener("click", this._show);
            }.bind(this)
          ); // Keep a collection of dialog closers, each of which will be bound a click
          // event listener to close the dialog

          this._closers = $$("[data-modal-hide]", this.container).concat(
            $$('[data-modal-hide="' + this.container.id + '"]')
          );

          this._closers.forEach(
            function (closer) {
              closer.addEventListener("click", this._hide);
            }.bind(this)
          ); // Execute all callbacks registered for the `create` event

          this._fire("create");

          return this;
        }
      },
      {
        key: "show",
        value: function show(event) {
          // If the dialog is already open, abort
          if (this.shown) {
            return this;
          }

          this.shown = true;
          this.container.style.display = "flex"; // Keep a reference to the currently focused element to be able to restore
          // it later

          focusedBeforeDialog = document.activeElement;

          if (this.useDialog) {
            this.dialog.showModal(_instanceof(event, Event) ? void 0 : event);
          } else {
            this.dialog.setAttribute("open", "");
            this.container.removeAttribute("aria-hidden"); // Iterate over the targets to disable them by setting their `aria-hidden`
            // attribute to `true`

            this._targets.forEach(function (target) {
              target.setAttribute("aria-hidden", "true");
            });
          } // Set the focus to the first focusable child of the dialog element

          setFocusToFirstItem(this.dialog); // Bind a focus event listener to the body element to make sure the focus
          // stays trapped inside the dialog while open, and start listening for some
          // specific key presses (TAB and ESC)

          document.body.addEventListener("focus", this._maintainFocus, true);
          document.addEventListener("keydown", this._bindKeypress); // Execute all callbacks registered for the `show` event

          this._fire("show", event);

          return this;
        }
      },
      {
        key: "hide",
        value: function hide(event) {
          // If the dialog is already closed, abort
          if (!this.shown) {
            return this;
          }

          this.shown = false;
          this.container.style.display = "none";

          if (this.useDialog) {
            this.dialog.close(_instanceof(event, Event) ? void 0 : event);
          } else {
            this.dialog.removeAttribute("open");
            this.container.setAttribute("aria-hidden", "true"); // Iterate over the targets to enable them by removing their `aria-hidden`
            // attribute

            this._targets.forEach(function (target) {
              target.removeAttribute("aria-hidden");
            });
          } // If there was a focused element before the dialog was opened, restore the
          // focus back to it

          if (focusedBeforeDialog) {
            focusedBeforeDialog.focus();
          } // Remove the focus event listener to the body element and stop listening
          // for specific key presses

          document.body.removeEventListener("focus", this._maintainFocus, true);
          document.removeEventListener("keydown", this._bindKeypress); // Execute all callbacks registered for the `hide` event

          this._fire("hide", event);

          return this;
        }
      },
      {
        key: "_fire",
        value: function _fire(type, event) {
          var listeners = this._listeners[type] || [];
          listeners.forEach(
            function (listener) {
              listener(this.container, event);
            }.bind(this)
          );
        }
      },
      {
        key: "_bindKeypress",
        value: function _bindKeypress(event) {
          // If the dialog is shown and the ESCAPE key is being pressed, prevent any
          // further effects from the ESCAPE key and hide the dialog
          if (this.shown && event.which === 27) {
            event.preventDefault();
            this.hide();
          } // If the dialog is shown and the TAB key is being pressed, make sure the
          // focus stays trapped within the dialog element

          if (this.shown && event.which === 9) {
            trapTabKey(this.dialog, event);
          }
        }
      },
      {
        key: "_maintainFocus",
        value: function _maintainFocus(event) {
          // If the dialog is shown and the focus is not within the dialog element,
          // move it back to its first focusable child
          if (this.shown && !this.container.contains(event.target)) {
            setFocusToFirstItem(this.dialog);
          }
        }
      }
    ]);

    return modalController;
  })(); // Creates a modal controller class for all the modals that can be opened on the DOM

modalOpeners.forEach(function (el) {
  var modalId = el.dataset.modalShow;
  new modalController(document.getElementById(modalId));
}); // Loads Scripts after the page is loaded

window.addEventListener("load", lazyload()); 
//