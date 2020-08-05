(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/cdk/overlay'), require('@angular/cdk/a11y'), require('@angular/cdk/keycodes'), require('@angular/cdk/bidi'), require('rxjs/operators'), require('rxjs'), require('@angular/cdk/collections'), require('@angular/cdk/coercion'), require('@angular/cdk/portal'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@angular/cdk-experimental/menu', ['exports', '@angular/core', '@angular/cdk/overlay', '@angular/cdk/a11y', '@angular/cdk/keycodes', '@angular/cdk/bidi', 'rxjs/operators', 'rxjs', '@angular/cdk/collections', '@angular/cdk/coercion', '@angular/cdk/portal', '@angular/common'], factory) :
    (global = global || self, factory((global.ng = global.ng || {}, global.ng.cdkExperimental = global.ng.cdkExperimental || {}, global.ng.cdkExperimental.menu = {}), global.ng.core, global.ng.cdk.overlay, global.ng.cdk.a11y, global.ng.cdk.keycodes, global.ng.cdk.bidi, global.rxjs.operators, global.rxjs, global.ng.cdk.collections, global.ng.cdk.coercion, global.ng.cdk.portal, global.ng.common));
}(this, (function (exports, i0, overlay, a11y, keycodes, bidi, operators, rxjs, collections, coercion, portal, common) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, exports) {
        for (var p in m)
            if (p !== "default" && !exports.hasOwnProperty(p))
                __createBinding(exports, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (Object.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /** Injection token used to return classes implementing the Menu interface */
    var CDK_MENU = new i0.InjectionToken('cdk-menu');

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * A directive to be combined with CdkMenuItem which opens the Menu it is bound to. If the
     * element is in a top level MenuBar it will open the menu on click, or if a sibling is already
     * opened it will open on hover. If it is inside of a Menu it will open the attached Submenu on
     * hover regardless of its sibling state.
     *
     * The directive must be placed along with the `cdkMenuItem` directive in order to enable full
     * functionality.
     */
    var CdkMenuItemTrigger = /** @class */ (function () {
        function CdkMenuItemTrigger(_elementRef, _viewContainerRef, _overlay, _parentMenu, _directionality) {
            this._elementRef = _elementRef;
            this._viewContainerRef = _viewContainerRef;
            this._overlay = _overlay;
            this._parentMenu = _parentMenu;
            this._directionality = _directionality;
            /** Emits when the attached menu is requested to open */
            this.opened = new i0.EventEmitter();
            /** Emits when the attached menu is requested to close */
            this.closed = new i0.EventEmitter();
            /** A reference to the overlay which manages the triggered menu */
            this._overlayRef = null;
        }
        Object.defineProperty(CdkMenuItemTrigger.prototype, "menuPanel", {
            /** Template reference variable to the menu this trigger opens */
            get: function () {
                return this._menuPanel;
            },
            set: function (panel) {
                this._menuPanel = panel;
                if (this._menuPanel) {
                    this._menuPanel._menuStack = this._getMenuStack();
                }
            },
            enumerable: false,
            configurable: true
        });
        /** Open/close the attached menu if the trigger has been configured with one */
        CdkMenuItemTrigger.prototype.toggle = function () {
            if (this.hasMenu()) {
                this.isMenuOpen() ? this.closeMenu() : this.openMenu();
            }
        };
        /** Open the attached menu. */
        CdkMenuItemTrigger.prototype.openMenu = function () {
            if (!this.isMenuOpen()) {
                this.opened.next();
                this._overlayRef = this._overlayRef || this._overlay.create(this._getOverlayConfig());
                this._overlayRef.attach(this._getPortal());
            }
        };
        /** Close the opened menu. */
        CdkMenuItemTrigger.prototype.closeMenu = function () {
            if (this.isMenuOpen()) {
                this.closed.next();
                this._overlayRef.detach();
            }
            this._closeSiblingTriggers();
        };
        /** Return true if the trigger has an attached menu */
        CdkMenuItemTrigger.prototype.hasMenu = function () {
            return !!this.menuPanel;
        };
        /** Whether the menu this button is a trigger for is open */
        CdkMenuItemTrigger.prototype.isMenuOpen = function () {
            return this._overlayRef ? this._overlayRef.hasAttached() : false;
        };
        /**
         * Get a reference to the rendered Menu if the Menu is open and it is visible in the DOM.
         * @return the menu if it is open, otherwise undefined.
         */
        CdkMenuItemTrigger.prototype.getMenu = function () {
            var _a;
            return (_a = this.menuPanel) === null || _a === void 0 ? void 0 : _a._menu;
        };
        /**
         * If there are existing open menus and this menu is not open, close sibling menus and open
         * this one.
         */
        CdkMenuItemTrigger.prototype._toggleOnMouseEnter = function () {
            var menuStack = this._getMenuStack();
            if (!menuStack.isEmpty() && !this.isMenuOpen()) {
                this._closeSiblingTriggers();
                this.openMenu();
            }
        };
        /**
         * Handles keyboard events for the menu item, specifically opening/closing the attached menu and
         * focusing the appropriate submenu item.
         * @param event the keyboard event to handle
         */
        CdkMenuItemTrigger.prototype._toggleOnKeydown = function (event) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
            var keyCode = event.keyCode;
            switch (keyCode) {
                case keycodes.SPACE:
                case keycodes.ENTER:
                    event.preventDefault();
                    this.toggle();
                    (_b = (_a = this.menuPanel) === null || _a === void 0 ? void 0 : _a._menu) === null || _b === void 0 ? void 0 : _b.focusFirstItem('keyboard');
                    break;
                case keycodes.RIGHT_ARROW:
                    if (this._isParentVertical()) {
                        event.preventDefault();
                        if (((_c = this._directionality) === null || _c === void 0 ? void 0 : _c.value) === 'rtl') {
                            this._getMenuStack().close(this._parentMenu, 2 /* currentItem */);
                        }
                        else {
                            this.openMenu();
                            (_e = (_d = this.menuPanel) === null || _d === void 0 ? void 0 : _d._menu) === null || _e === void 0 ? void 0 : _e.focusFirstItem('keyboard');
                        }
                    }
                    break;
                case keycodes.LEFT_ARROW:
                    if (this._isParentVertical()) {
                        event.preventDefault();
                        if (((_f = this._directionality) === null || _f === void 0 ? void 0 : _f.value) === 'rtl') {
                            this.openMenu();
                            (_h = (_g = this.menuPanel) === null || _g === void 0 ? void 0 : _g._menu) === null || _h === void 0 ? void 0 : _h.focusFirstItem('keyboard');
                        }
                        else {
                            this._getMenuStack().close(this._parentMenu, 2 /* currentItem */);
                        }
                    }
                    break;
                case keycodes.DOWN_ARROW:
                case keycodes.UP_ARROW:
                    if (!this._isParentVertical()) {
                        event.preventDefault();
                        this.openMenu();
                        keyCode === keycodes.DOWN_ARROW
                            ? (_k = (_j = this.menuPanel) === null || _j === void 0 ? void 0 : _j._menu) === null || _k === void 0 ? void 0 : _k.focusFirstItem('keyboard') : (_m = (_l = this.menuPanel) === null || _l === void 0 ? void 0 : _l._menu) === null || _m === void 0 ? void 0 : _m.focusLastItem('keyboard');
                    }
                    break;
            }
        };
        /** Close out any sibling menu trigger menus. */
        CdkMenuItemTrigger.prototype._closeSiblingTriggers = function () {
            var menuStack = this._getMenuStack();
            // If nothing was removed from the stack and the last element is not the parent item
            // that means that the parent menu is a menu bar since we don't put the menu bar on the
            // stack
            var isParentMenuBar = !menuStack.closeSubMenuOf(this._parentMenu) && menuStack.peek() !== this._parentMenu;
            if (isParentMenuBar) {
                menuStack.closeAll();
            }
        };
        /** Get the configuration object used to create the overlay */
        CdkMenuItemTrigger.prototype._getOverlayConfig = function () {
            return new overlay.OverlayConfig({
                positionStrategy: this._getOverlayPositionStrategy(),
                scrollStrategy: this._overlay.scrollStrategies.block(),
                direction: this._directionality,
            });
        };
        /** Build the position strategy for the overlay which specifies where to place the menu */
        CdkMenuItemTrigger.prototype._getOverlayPositionStrategy = function () {
            return this._overlay
                .position()
                .flexibleConnectedTo(this._elementRef)
                .withPositions(this._getOverlayPositions());
        };
        /** Determine and return where to position the opened menu relative to the menu item */
        CdkMenuItemTrigger.prototype._getOverlayPositions = function () {
            // TODO: use a common positioning config from (possibly) cdk/overlay
            return this._parentMenu.orientation === 'horizontal'
                ? [
                    { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
                    { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' },
                    { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' },
                    { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom' },
                ]
                : [
                    { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'top' },
                    { originX: 'end', originY: 'bottom', overlayX: 'start', overlayY: 'bottom' },
                    { originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'top' },
                    { originX: 'start', originY: 'bottom', overlayX: 'end', overlayY: 'bottom' },
                ];
        };
        /**
         * Get the portal to be attached to the overlay which contains the menu. Allows for the menu
         * content to change dynamically and be reflected in the application.
         */
        CdkMenuItemTrigger.prototype._getPortal = function () {
            var _a, _b;
            var hasMenuContentChanged = ((_a = this.menuPanel) === null || _a === void 0 ? void 0 : _a._templateRef) !== ((_b = this._panelContent) === null || _b === void 0 ? void 0 : _b.templateRef);
            if (this.menuPanel && (!this._panelContent || hasMenuContentChanged)) {
                this._panelContent = new portal.TemplatePortal(this.menuPanel._templateRef, this._viewContainerRef);
            }
            return this._panelContent;
        };
        /**
         * @return true if if the enclosing parent menu is configured in a vertical orientation.
         */
        CdkMenuItemTrigger.prototype._isParentVertical = function () {
            return this._parentMenu.orientation === 'vertical';
        };
        /** Get the menu stack from the parent. */
        CdkMenuItemTrigger.prototype._getMenuStack = function () {
            // We use a function since at the construction of the MenuItemTrigger the parent Menu won't have
            // its menu stack set. Therefore we need to reference the menu stack from the parent each time
            // we want to use it.
            return this._parentMenu._menuStack;
        };
        CdkMenuItemTrigger.prototype.ngOnDestroy = function () {
            this._destroyOverlay();
        };
        /** Destroy and unset the overlay reference it if exists */
        CdkMenuItemTrigger.prototype._destroyOverlay = function () {
            if (this._overlayRef) {
                this._overlayRef.dispose();
                this._overlayRef = null;
            }
        };
        return CdkMenuItemTrigger;
    }());
    CdkMenuItemTrigger.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[cdkMenuTriggerFor]',
                    exportAs: 'cdkMenuTriggerFor',
                    host: {
                        '(keydown)': '_toggleOnKeydown($event)',
                        '(mouseenter)': '_toggleOnMouseEnter()',
                        '(click)': 'toggle()',
                        'tabindex': '-1',
                        'aria-haspopup': 'menu',
                        '[attr.aria-expanded]': 'isMenuOpen()',
                    },
                },] }
    ];
    CdkMenuItemTrigger.ctorParameters = function () { return [
        { type: i0.ElementRef },
        { type: i0.ViewContainerRef },
        { type: overlay.Overlay },
        { type: undefined, decorators: [{ type: i0.Inject, args: [CDK_MENU,] }] },
        { type: bidi.Directionality, decorators: [{ type: i0.Optional }] }
    ]; };
    CdkMenuItemTrigger.propDecorators = {
        menuPanel: [{ type: i0.Input, args: ['cdkMenuTriggerFor',] }],
        opened: [{ type: i0.Output, args: ['cdkMenuOpened',] }],
        closed: [{ type: i0.Output, args: ['cdkMenuClosed',] }]
    };

    // TODO refactor this to be configurable allowing for custom elements to be removed
    /** Removes all icons from within the given element. */
    function removeIcons(element) {
        var e_1, _c;
        var _a;
        try {
            for (var _d = __values(Array.from(element.querySelectorAll('mat-icon, .material-icons'))), _e = _d.next(); !_e.done; _e = _d.next()) {
                var icon = _e.value;
                (_a = icon.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(icon);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_c = _d.return)) _c.call(_d);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    /**
     * Directive which provides the ability for an element to be focused and navigated to using the
     * keyboard when residing in a CdkMenu, CdkMenuBar, or CdkMenuGroup. It performs user defined
     * behavior when clicked.
     */
    var CdkMenuItem = /** @class */ (function () {
        function CdkMenuItem(_elementRef, _parentMenu, _ngZone, _dir, 
        /** Reference to the CdkMenuItemTrigger directive if one is added to the same element */
        // `CdkMenuItem` is commonly used in combination with a `CdkMenuItemTrigger`.
        // tslint:disable-next-line: lightweight-tokens
        _menuTrigger) {
            this._elementRef = _elementRef;
            this._parentMenu = _parentMenu;
            this._ngZone = _ngZone;
            this._dir = _dir;
            this._menuTrigger = _menuTrigger;
            this._disabled = false;
            /**
             * If this MenuItem is a regular MenuItem, outputs when it is triggered by a keyboard or mouse
             * event.
             */
            this.triggered = new i0.EventEmitter();
            /** Emits when the menu item is destroyed. */
            this._destroyed = new rxjs.Subject();
            this._setupMouseEnter();
        }
        Object.defineProperty(CdkMenuItem.prototype, "disabled", {
            /**  Whether the CdkMenuItem is disabled - defaults to false */
            get: function () {
                return this._disabled;
            },
            set: function (value) {
                this._disabled = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        /** Place focus on the element. */
        CdkMenuItem.prototype.focus = function () {
            this._elementRef.nativeElement.focus();
        };
        // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
        // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
        // can move this back into `host`.
        // tslint:disable:no-host-decorator-in-concrete
        /**
         * If the menu item is not disabled and the element does not have a menu trigger attached, emit
         * on the cdkMenuItemTriggered emitter and close all open menus.
         */
        CdkMenuItem.prototype.trigger = function () {
            if (!this.disabled && !this.hasMenu()) {
                this.triggered.next();
                this._getMenuStack().closeAll();
            }
        };
        /** Whether the menu item opens a menu. */
        CdkMenuItem.prototype.hasMenu = function () {
            var _a;
            return !!((_a = this._menuTrigger) === null || _a === void 0 ? void 0 : _a.hasMenu());
        };
        /** Return true if this MenuItem has an attached menu and it is open. */
        CdkMenuItem.prototype.isMenuOpen = function () {
            var _a;
            return !!((_a = this._menuTrigger) === null || _a === void 0 ? void 0 : _a.isMenuOpen());
        };
        /**
         * Get a reference to the rendered Menu if the Menu is open and it is visible in the DOM.
         * @return the menu if it is open, otherwise undefined.
         */
        CdkMenuItem.prototype.getMenu = function () {
            var _a;
            return (_a = this._menuTrigger) === null || _a === void 0 ? void 0 : _a.getMenu();
        };
        /** Get the MenuItemTrigger associated with this element. */
        CdkMenuItem.prototype.getMenuTrigger = function () {
            return this._menuTrigger;
        };
        /** Get the label for this element which is required by the FocusableOption interface. */
        CdkMenuItem.prototype.getLabel = function () {
            var _a;
            // TODO cloning the tree may be expensive; implement a better method
            // we know that the current node is an element type
            var clone = this._elementRef.nativeElement.cloneNode(true);
            removeIcons(clone);
            return ((_a = clone.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '';
        };
        // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
        // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
        // can move this back into `host`.
        // tslint:disable:no-host-decorator-in-concrete
        /**
         * Handles keyboard events for the menu item, specifically either triggering the user defined
         * callback or opening/closing the current menu based on whether the left or right arrow key was
         * pressed.
         * @param event the keyboard event to handle
         */
        CdkMenuItem.prototype._onKeydown = function (event) {
            var _a, _b;
            switch (event.keyCode) {
                case keycodes.SPACE:
                case keycodes.ENTER:
                    event.preventDefault();
                    this.trigger();
                    break;
                case keycodes.RIGHT_ARROW:
                    if (this._isParentVertical() && !this.hasMenu()) {
                        event.preventDefault();
                        ((_a = this._dir) === null || _a === void 0 ? void 0 : _a.value) === 'rtl'
                            ? this._getMenuStack().close(this._parentMenu, 1 /* previousItem */)
                            : this._getMenuStack().closeAll(0 /* nextItem */);
                    }
                    break;
                case keycodes.LEFT_ARROW:
                    if (this._isParentVertical() && !this.hasMenu()) {
                        event.preventDefault();
                        ((_b = this._dir) === null || _b === void 0 ? void 0 : _b.value) === 'rtl'
                            ? this._getMenuStack().closeAll(0 /* nextItem */)
                            : this._getMenuStack().close(this._parentMenu, 1 /* previousItem */);
                    }
                    break;
            }
        };
        /**
         * Subscribe to the mouseenter events and close any sibling menu items if this element is moused
         * into.
         */
        CdkMenuItem.prototype._setupMouseEnter = function () {
            var _this = this;
            this._ngZone.runOutsideAngular(function () { return rxjs.fromEvent(_this._elementRef.nativeElement, 'mouseenter')
                .pipe(operators.filter(function () { return !_this._getMenuStack().isEmpty() && !_this.hasMenu(); }), operators.takeUntil(_this._destroyed))
                .subscribe(function () {
                _this._ngZone.run(function () { return _this._getMenuStack().closeSubMenuOf(_this._parentMenu); });
            }); });
        };
        /** Return true if the enclosing parent menu is configured in a horizontal orientation. */
        CdkMenuItem.prototype._isParentVertical = function () {
            return this._parentMenu.orientation === 'vertical';
        };
        /** Get the MenuStack from the parent menu. */
        CdkMenuItem.prototype._getMenuStack = function () {
            // We use a function since at the construction of the MenuItemTrigger the parent Menu won't have
            // its menu stack set. Therefore we need to reference the menu stack from the parent each time
            // we want to use it.
            return this._parentMenu._menuStack;
        };
        CdkMenuItem.prototype.ngOnDestroy = function () {
            this._destroyed.next();
        };
        return CdkMenuItem;
    }());
    CdkMenuItem.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[cdkMenuItem]',
                    exportAs: 'cdkMenuItem',
                    host: {
                        'tabindex': '-1',
                        'type': 'button',
                        'role': 'menuitem',
                        'class': 'cdk-menu-item',
                        '[attr.aria-disabled]': 'disabled || null',
                    },
                },] }
    ];
    CdkMenuItem.ctorParameters = function () { return [
        { type: i0.ElementRef },
        { type: undefined, decorators: [{ type: i0.Inject, args: [CDK_MENU,] }] },
        { type: i0.NgZone },
        { type: bidi.Directionality, decorators: [{ type: i0.Optional }] },
        { type: CdkMenuItemTrigger, decorators: [{ type: i0.Self }, { type: i0.Optional }] }
    ]; };
    CdkMenuItem.propDecorators = {
        disabled: [{ type: i0.Input }],
        triggered: [{ type: i0.Output, args: ['cdkMenuItemTriggered',] }],
        trigger: [{ type: i0.HostListener, args: ['click',] }],
        _onKeydown: [{ type: i0.HostListener, args: ['keydown', ['$event'],] }]
    };

    /** Counter used to set a unique id and name for a selectable item */
    var nextId = 0;
    /**
     * Base class providing checked state for MenuItems along with outputting a clicked event when the
     * element is triggered. It provides functionality for selectable elements.
     */
    var CdkMenuItemSelectable = /** @class */ (function (_super) {
        __extends(CdkMenuItemSelectable, _super);
        function CdkMenuItemSelectable() {
            var _this = _super.apply(this, __spread(arguments)) || this;
            /** Event emitted when the selectable item is clicked */
            _this.clicked = new i0.EventEmitter();
            _this._checked = false;
            /** The name of the selectable element with a default value */
            _this.name = "cdk-selectable-item-" + nextId++;
            /** The id of the selectable element with a default value */
            _this.id = "cdk-selectable-item-" + nextId++;
            return _this;
        }
        Object.defineProperty(CdkMenuItemSelectable.prototype, "checked", {
            /** Whether the element is checked */
            get: function () {
                return this._checked;
            },
            set: function (value) {
                this._checked = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        /** If the element is not disabled emit the click event */
        CdkMenuItemSelectable.prototype.trigger = function () {
            if (!this.disabled) {
                this.clicked.next(this);
            }
        };
        return CdkMenuItemSelectable;
    }(CdkMenuItem));
    CdkMenuItemSelectable.decorators = [
        { type: i0.Directive }
    ];
    CdkMenuItemSelectable.propDecorators = {
        clicked: [{ type: i0.Output }],
        checked: [{ type: i0.Input }],
        name: [{ type: i0.Input }],
        id: [{ type: i0.Input }]
    };

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Directive which acts as a grouping container for `CdkMenuItem` instances with
     * `role="menuitemradio"`, similar to a `role="radiogroup"` element.
     */
    var CdkMenuGroup = /** @class */ (function () {
        function CdkMenuGroup() {
            /** Emits the element when checkbox or radiobutton state changed  */
            this.change = new i0.EventEmitter();
            /** Emits when the _selectableItems QueryList triggers a change */
            this._selectableChanges = new i0.EventEmitter();
        }
        CdkMenuGroup.prototype.ngAfterContentInit = function () {
            this._registerMenuSelectionListeners();
        };
        /**
         * Register the child selectable elements with the change emitter and ensure any new child
         * elements do so as well.
         */
        CdkMenuGroup.prototype._registerMenuSelectionListeners = function () {
            var _this = this;
            this._selectableItems.forEach(function (selectable) { return _this._registerClickListener(selectable); });
            this._selectableItems.changes.subscribe(function (selectableItems) {
                _this._selectableChanges.next();
                selectableItems.forEach(function (selectable) { return _this._registerClickListener(selectable); });
            });
        };
        /** Register each selectable to emit on the change Emitter when clicked */
        CdkMenuGroup.prototype._registerClickListener = function (selectable) {
            var _this = this;
            selectable.clicked
                .pipe(operators.takeUntil(this._selectableChanges))
                .subscribe(function () { return _this.change.next(selectable); });
        };
        CdkMenuGroup.prototype.ngOnDestroy = function () {
            this._selectableChanges.next();
            this._selectableChanges.complete();
        };
        return CdkMenuGroup;
    }());
    CdkMenuGroup.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[cdkMenuGroup]',
                    exportAs: 'cdkMenuGroup',
                    host: {
                        'role': 'group',
                        'class': 'cdk-menu-group',
                    },
                    providers: [{ provide: collections.UniqueSelectionDispatcher, useClass: collections.UniqueSelectionDispatcher }],
                },] }
    ];
    CdkMenuGroup.propDecorators = {
        change: [{ type: i0.Output }],
        _selectableItems: [{ type: i0.ContentChildren, args: [CdkMenuItemSelectable, { descendants: true },] }]
    };

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Directive applied to an ng-template which wraps a CdkMenu and provides a reference to the
     * child element it wraps which allows for opening of the CdkMenu in an overlay.
     */
    var CdkMenuPanel = /** @class */ (function () {
        function CdkMenuPanel(_templateRef) {
            this._templateRef = _templateRef;
        }
        /**
         * Set the Menu component on the menu panel. Since we cannot use ContentChild to fetch the
         * child Menu component, the child Menu must register its self with the parent MenuPanel.
         */
        CdkMenuPanel.prototype._registerMenu = function (child) {
            this._menu = child;
            // The ideal solution would be to affect the CdkMenuPanel injector from the CdkMenuTrigger and
            // inject the menu stack reference into the child menu and menu items, however this isn't
            // possible at this time.
            this._menu._menuStack = this._menuStack;
            this._menuStack.push(child);
        };
        return CdkMenuPanel;
    }());
    CdkMenuPanel.decorators = [
        { type: i0.Directive, args: [{ selector: 'ng-template[cdkMenuPanel]', exportAs: 'cdkMenuPanel' },] }
    ];
    CdkMenuPanel.ctorParameters = function () { return [
        { type: i0.TemplateRef }
    ]; };

    /**
     * MenuStack allows subscribers to listen for close events (when a MenuStackItem is popped off
     * of the stack) in order to perform closing actions. Upon the MenuStack being empty it emits
     * from the `empty` observable specifying the next focus action which the listener should perform
     * as requested by the closer.
     */
    var MenuStack = /** @class */ (function () {
        function MenuStack() {
            /** All MenuStackItems tracked by this MenuStack. */
            this._elements = [];
            /** Emits the element which was popped off of the stack when requested by a closer. */
            this._close = new rxjs.Subject();
            /** Emits once the MenuStack has become empty after popping off elements. */
            this._empty = new rxjs.Subject();
            /** Observable which emits the MenuStackItem which has been requested to close. */
            this.closed = this._close;
            /**
             * Observable which emits when the MenuStack is empty after popping off the last element. It
             * emits a FocusNext event which specifies the action the closer has requested the listener
             * perform.
             */
            this.emptied = this._empty;
        }
        /** @param menu the MenuStackItem to put on the stack. */
        MenuStack.prototype.push = function (menu) {
            this._elements.push(menu);
        };
        /**
         * Pop items off of the stack up to and including `lastItem` and emit each on the close
         * observable. If the stack is empty or `lastItem` is not on the stack it does nothing.
         * @param lastItem the last item to pop off the stack.
         * @param focusNext the event to emit on the `empty` observable if the method call resulted in an
         * empty stack. Does not emit if the stack was initially empty or if `lastItem` was not on the
         * stack.
         */
        MenuStack.prototype.close = function (lastItem, focusNext) {
            if (this._elements.indexOf(lastItem) >= 0) {
                var poppedElement = void 0;
                do {
                    poppedElement = this._elements.pop();
                    this._close.next(poppedElement);
                } while (poppedElement !== lastItem);
                if (this.isEmpty()) {
                    this._empty.next(focusNext);
                }
            }
        };
        /**
         * Pop items off of the stack up to but excluding `lastItem` and emit each on the close
         * observable. If the stack is empty or `lastItem` is not on the stack it does nothing.
         * @param lastItem the element which should be left on the stack
         * @return whether or not an item was removed from the stack
         */
        MenuStack.prototype.closeSubMenuOf = function (lastItem) {
            var removed = false;
            if (this._elements.indexOf(lastItem) >= 0) {
                removed = this.peek() !== lastItem;
                while (this.peek() !== lastItem) {
                    this._close.next(this._elements.pop());
                }
            }
            return removed;
        };
        /**
         * Pop off all MenuStackItems and emit each one on the `close` observable one by one.
         * @param focusNext the event to emit on the `empty` observable once the stack is emptied. Does
         * not emit if the stack was initially empty.
         */
        MenuStack.prototype.closeAll = function (focusNext) {
            if (!this.isEmpty()) {
                while (!this.isEmpty()) {
                    var menuStackItem = this._elements.pop();
                    if (menuStackItem) {
                        this._close.next(menuStackItem);
                    }
                }
                this._empty.next(focusNext);
            }
        };
        /** Return true if this stack is empty. */
        MenuStack.prototype.isEmpty = function () {
            return !this._elements.length;
        };
        /** Return the length of the stack. */
        MenuStack.prototype.length = function () {
            return this._elements.length;
        };
        /** Get the top most element on the stack. */
        MenuStack.prototype.peek = function () {
            return this._elements[this._elements.length - 1];
        };
        return MenuStack;
    }());
    /** NoopMenuStack is a placeholder MenuStack used for inline menus. */
    var NoopMenuStack = /** @class */ (function (_super) {
        __extends(NoopMenuStack, _super);
        function NoopMenuStack() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /** Noop push - does not add elements to the MenuStack. */
        NoopMenuStack.prototype.push = function (_) { };
        return NoopMenuStack;
    }(MenuStack));

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Gets a stream of pointer (mouse) entries into the given items.
     * This should typically run outside the Angular zone.
     */
    function getItemPointerEntries(items) {
        return rxjs.defer(function () { return items.changes.pipe(operators.startWith(items), operators.mergeMap(function (list) { return list.map(function (element) { return rxjs.fromEvent(element._elementRef.nativeElement, 'mouseenter').pipe(operators.mapTo(element), operators.takeUntil(items.changes)); }); }), operators.mergeAll()); });
    }

    /**
     * Directive which configures the element as a Menu which should contain child elements marked as
     * CdkMenuItem or CdkMenuGroup. Sets the appropriate role and aria-attributes for a menu and
     * contains accessible keyboard and mouse handling logic.
     *
     * It also acts as a RadioGroup for elements marked with role `menuitemradio`.
     */
    var CdkMenu = /** @class */ (function (_super) {
        __extends(CdkMenu, _super);
        function CdkMenu(_ngZone, _dir, 
        // `CdkMenuPanel` is always used in combination with a `CdkMenu`.
        // tslint:disable-next-line: lightweight-tokens
        _menuPanel) {
            var _this = _super.call(this) || this;
            _this._ngZone = _ngZone;
            _this._dir = _dir;
            _this._menuPanel = _menuPanel;
            /**
             * Sets the aria-orientation attribute and determines where menus will be opened.
             * Does not affect styling/layout.
             */
            _this.orientation = 'vertical';
            /** Event emitted when the menu is closed. */
            _this.closed = new i0.EventEmitter();
            // We provide a default MenuStack implementation in case the menu is an inline menu.
            // For Menus part of a MenuBar nested within a MenuPanel this will be overwritten
            // to the correct parent MenuStack.
            /** Track the Menus making up the open menu stack. */
            _this._menuStack = new NoopMenuStack();
            return _this;
        }
        CdkMenu.prototype.ngOnInit = function () {
            this._registerWithParentPanel();
        };
        CdkMenu.prototype.ngAfterContentInit = function () {
            _super.prototype.ngAfterContentInit.call(this);
            this._completeChangeEmitter();
            this._setKeyManager();
            this._subscribeToMenuOpen();
            this._subscribeToMenuStack();
            this._subscribeToMouseManager();
        };
        // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
        // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
        // can move this back into `host`.
        // tslint:disable:no-host-decorator-in-concrete
        /** Place focus on the first MenuItem in the menu and set the focus origin. */
        CdkMenu.prototype.focusFirstItem = function (focusOrigin) {
            if (focusOrigin === void 0) { focusOrigin = 'program'; }
            this._keyManager.setFocusOrigin(focusOrigin);
            this._keyManager.setFirstItemActive();
        };
        /** Place focus on the last MenuItem in the menu and set the focus origin. */
        CdkMenu.prototype.focusLastItem = function (focusOrigin) {
            if (focusOrigin === void 0) { focusOrigin = 'program'; }
            this._keyManager.setFocusOrigin(focusOrigin);
            this._keyManager.setLastItemActive();
        };
        // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
        // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
        // can move this back into `host`.
        // tslint:disable:no-host-decorator-in-concrete
        /** Handle keyboard events for the Menu. */
        CdkMenu.prototype._handleKeyEvent = function (event) {
            var keyManager = this._keyManager;
            switch (event.keyCode) {
                case keycodes.LEFT_ARROW:
                case keycodes.RIGHT_ARROW:
                    if (this._isHorizontal()) {
                        event.preventDefault();
                        keyManager.setFocusOrigin('keyboard');
                        keyManager.onKeydown(event);
                    }
                    break;
                case keycodes.UP_ARROW:
                case keycodes.DOWN_ARROW:
                    if (!this._isHorizontal()) {
                        event.preventDefault();
                        keyManager.setFocusOrigin('keyboard');
                        keyManager.onKeydown(event);
                    }
                    break;
                case keycodes.ESCAPE:
                    if (!keycodes.hasModifierKey(event)) {
                        event.preventDefault();
                        this._menuStack.close(this, 2 /* currentItem */);
                    }
                    break;
                case keycodes.TAB:
                    this._menuStack.closeAll();
                    break;
                default:
                    keyManager.onKeydown(event);
            }
        };
        /** Register this menu with its enclosing parent menu panel */
        CdkMenu.prototype._registerWithParentPanel = function () {
            var _a;
            (_a = this._getMenuPanel()) === null || _a === void 0 ? void 0 : _a._registerMenu(this);
        };
        /**
         * Get the enclosing CdkMenuPanel defaulting to the injected reference over the developer
         * provided reference.
         */
        CdkMenu.prototype._getMenuPanel = function () {
            return this._menuPanel || this._explicitPanel;
        };
        /**
         * Complete the change emitter if there are any nested MenuGroups or register to complete the
         * change emitter if a MenuGroup is rendered at some point
         */
        CdkMenu.prototype._completeChangeEmitter = function () {
            var _this = this;
            if (this._hasNestedGroups()) {
                this.change.complete();
            }
            else {
                this._nestedGroups.changes.pipe(operators.take(1)).subscribe(function () { return _this.change.complete(); });
            }
        };
        /** Return true if there are nested CdkMenuGroup elements within the Menu */
        CdkMenu.prototype._hasNestedGroups = function () {
            // view engine has a bug where @ContentChildren will return the current element
            // along with children if the selectors match - not just the children.
            // Here, if there is at least one element, we check to see if the first element is a CdkMenu in
            // order to ensure that we return true iff there are child CdkMenuGroup elements.
            return this._nestedGroups.length > 0 && !(this._nestedGroups.first instanceof CdkMenu);
        };
        /** Setup the FocusKeyManager with the correct orientation for the menu. */
        CdkMenu.prototype._setKeyManager = function () {
            var _a;
            this._keyManager = new a11y.FocusKeyManager(this._allItems)
                .withWrap()
                .withTypeAhead()
                .withHomeAndEnd();
            if (this._isHorizontal()) {
                this._keyManager.withHorizontalOrientation(((_a = this._dir) === null || _a === void 0 ? void 0 : _a.value) || 'ltr');
            }
            else {
                this._keyManager.withVerticalOrientation();
            }
        };
        /**
         * Set the FocusMouseManager and ensure that when mouse focus changes the key manager is updated
         * with the latest menu item under mouse focus.
         */
        CdkMenu.prototype._subscribeToMouseManager = function () {
            var _this = this;
            this._ngZone.runOutsideAngular(function () {
                _this._mouseFocusChanged = getItemPointerEntries(_this._allItems);
                _this._mouseFocusChanged
                    .pipe(operators.takeUntil(_this.closed))
                    .subscribe(function (item) { return _this._keyManager.setActiveItem(item); });
            });
        };
        /** Subscribe to the MenuStack close and empty observables. */
        CdkMenu.prototype._subscribeToMenuStack = function () {
            var _this = this;
            this._menuStack.closed
                .pipe(operators.takeUntil(this.closed))
                .subscribe(function (item) { return _this._closeOpenMenu(item); });
            this._menuStack.emptied
                .pipe(operators.takeUntil(this.closed))
                .subscribe(function (event) { return _this._toggleMenuFocus(event); });
        };
        /**
         * Close the open menu if the current active item opened the requested MenuStackItem.
         * @param item the MenuStackItem requested to be closed.
         */
        CdkMenu.prototype._closeOpenMenu = function (menu) {
            var _a, _b;
            var keyManager = this._keyManager;
            var trigger = this._openItem;
            if (menu === ((_a = trigger === null || trigger === void 0 ? void 0 : trigger.getMenuTrigger()) === null || _a === void 0 ? void 0 : _a.getMenu())) {
                (_b = trigger.getMenuTrigger()) === null || _b === void 0 ? void 0 : _b.closeMenu();
                keyManager.setFocusOrigin('keyboard');
                keyManager.setActiveItem(trigger);
            }
        };
        /** Set focus the either the current, previous or next item based on the FocusNext event. */
        CdkMenu.prototype._toggleMenuFocus = function (event) {
            var keyManager = this._keyManager;
            switch (event) {
                case 0 /* nextItem */:
                    keyManager.setFocusOrigin('keyboard');
                    keyManager.setNextItemActive();
                    break;
                case 1 /* previousItem */:
                    keyManager.setFocusOrigin('keyboard');
                    keyManager.setPreviousItemActive();
                    break;
                case 2 /* currentItem */:
                    if (keyManager.activeItem) {
                        keyManager.setFocusOrigin('keyboard');
                        keyManager.setActiveItem(keyManager.activeItem);
                    }
                    break;
            }
        };
        // TODO(andy9775): remove duplicate logic between menu an menu bar
        /**
         * Subscribe to the menu trigger's open events in order to track the trigger which opened the menu
         * and stop tracking it when the menu is closed.
         */
        CdkMenu.prototype._subscribeToMenuOpen = function () {
            var _this = this;
            var exitCondition = rxjs.merge(this._allItems.changes, this.closed);
            this._allItems.changes
                .pipe(operators.startWith(this._allItems), operators.mergeMap(function (list) { return list
                .filter(function (item) { return item.hasMenu(); })
                .map(function (item) { return item.getMenuTrigger().opened.pipe(operators.mapTo(item), operators.takeUntil(exitCondition)); }); }), operators.mergeAll(), operators.switchMap(function (item) {
                _this._openItem = item;
                return item.getMenuTrigger().closed;
            }), operators.takeUntil(this.closed))
                .subscribe(function () { return (_this._openItem = undefined); });
        };
        /** Return true if this menu has been configured in a horizontal orientation. */
        CdkMenu.prototype._isHorizontal = function () {
            return this.orientation === 'horizontal';
        };
        /**
         * Return true if this menu is an inline menu. That is, it does not exist in a pop-up and is
         * always visible in the dom.
         */
        CdkMenu.prototype._isInline = function () {
            // NoopMenuStack is the default. If this menu is not inline than the NoopMenuStack is replaced
            // automatically.
            return this._menuStack instanceof NoopMenuStack;
        };
        CdkMenu.prototype.ngOnDestroy = function () {
            this._emitClosedEvent();
        };
        /** Emit and complete the closed event emitter */
        CdkMenu.prototype._emitClosedEvent = function () {
            this.closed.next();
            this.closed.complete();
        };
        return CdkMenu;
    }(CdkMenuGroup));
    CdkMenu.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[cdkMenu]',
                    exportAs: 'cdkMenu',
                    host: {
                        '[tabindex]': '_isInline() ? 0 : null',
                        'role': 'menu',
                        'class': 'cdk-menu',
                        '[attr.aria-orientation]': 'orientation',
                    },
                    providers: [
                        { provide: CdkMenuGroup, useExisting: CdkMenu },
                        { provide: CDK_MENU, useExisting: CdkMenu },
                    ],
                },] }
    ];
    CdkMenu.ctorParameters = function () { return [
        { type: i0.NgZone },
        { type: bidi.Directionality, decorators: [{ type: i0.Optional }] },
        { type: CdkMenuPanel, decorators: [{ type: i0.Optional }] }
    ]; };
    CdkMenu.propDecorators = {
        orientation: [{ type: i0.Input, args: ['cdkMenuOrientation',] }],
        closed: [{ type: i0.Output }],
        _nestedGroups: [{ type: i0.ContentChildren, args: [CdkMenuGroup, { descendants: true },] }],
        _allItems: [{ type: i0.ContentChildren, args: [CdkMenuItem, { descendants: true },] }],
        _explicitPanel: [{ type: i0.Input, args: ['cdkMenuPanel',] }],
        focusFirstItem: [{ type: i0.HostListener, args: ['focus',] }],
        _handleKeyEvent: [{ type: i0.HostListener, args: ['keydown', ['$event'],] }]
    };

    /**
     * Check if the given element is part of the cdk menu module.
     * @param target the element to check.
     * @return true if the given element is part of the menu module.
     */
    function isMenuElement(target) {
        return target.className.indexOf('cdk-menu') !== -1;
    }
    /**
     * Directive applied to an element which configures it as a MenuBar by setting the appropriate
     * role, aria attributes, and accessible keyboard and mouse handling logic. The component that
     * this directive is applied to should contain components marked with CdkMenuItem.
     *
     */
    var CdkMenuBar = /** @class */ (function (_super) {
        __extends(CdkMenuBar, _super);
        function CdkMenuBar(_menuStack, _ngZone, _dir) {
            var _this = _super.call(this) || this;
            _this._menuStack = _menuStack;
            _this._ngZone = _ngZone;
            _this._dir = _dir;
            /**
             * Sets the aria-orientation attribute and determines where menus will be opened.
             * Does not affect styling/layout.
             */
            _this.orientation = 'horizontal';
            /** Emits when the MenuBar is destroyed. */
            _this._destroyed = new rxjs.Subject();
            return _this;
        }
        CdkMenuBar.prototype.ngAfterContentInit = function () {
            _super.prototype.ngAfterContentInit.call(this);
            this._setKeyManager();
            this._subscribeToMenuOpen();
            this._subscribeToMenuStack();
            this._subscribeToMouseManager();
        };
        // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
        // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
        // can move this back into `host`.
        // tslint:disable:no-host-decorator-in-concrete
        /** Place focus on the first MenuItem in the menu and set the focus origin. */
        CdkMenuBar.prototype.focusFirstItem = function (focusOrigin) {
            if (focusOrigin === void 0) { focusOrigin = 'program'; }
            this._keyManager.setFocusOrigin(focusOrigin);
            this._keyManager.setFirstItemActive();
        };
        /** Place focus on the last MenuItem in the menu and set the focus origin. */
        CdkMenuBar.prototype.focusLastItem = function (focusOrigin) {
            if (focusOrigin === void 0) { focusOrigin = 'program'; }
            this._keyManager.setFocusOrigin(focusOrigin);
            this._keyManager.setLastItemActive();
        };
        // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
        // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
        // can move this back into `host`.
        // tslint:disable:no-host-decorator-in-concrete
        /**
         * Handle keyboard events, specifically changing the focused element and/or toggling the active
         * items menu.
         * @param event the KeyboardEvent to handle.
         */
        CdkMenuBar.prototype._handleKeyEvent = function (event) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            var keyManager = this._keyManager;
            switch (event.keyCode) {
                case keycodes.UP_ARROW:
                case keycodes.DOWN_ARROW:
                case keycodes.LEFT_ARROW:
                case keycodes.RIGHT_ARROW:
                    var horizontalArrows = event.keyCode === keycodes.LEFT_ARROW || event.keyCode === keycodes.RIGHT_ARROW;
                    // For a horizontal menu if the left/right keys were clicked, or a vertical menu if the
                    // up/down keys were clicked: if the current menu is open, close it then focus and open the
                    // next  menu.
                    if ((this._isHorizontal() && horizontalArrows) ||
                        (!this._isHorizontal() && !horizontalArrows)) {
                        event.preventDefault();
                        var prevIsOpen = (_a = keyManager.activeItem) === null || _a === void 0 ? void 0 : _a.isMenuOpen();
                        (_c = (_b = keyManager.activeItem) === null || _b === void 0 ? void 0 : _b.getMenuTrigger()) === null || _c === void 0 ? void 0 : _c.closeMenu();
                        keyManager.setFocusOrigin('keyboard');
                        keyManager.onKeydown(event);
                        if (prevIsOpen) {
                            (_e = (_d = keyManager.activeItem) === null || _d === void 0 ? void 0 : _d.getMenuTrigger()) === null || _e === void 0 ? void 0 : _e.openMenu();
                        }
                    }
                    break;
                case keycodes.ESCAPE:
                    event.preventDefault();
                    (_g = (_f = keyManager.activeItem) === null || _f === void 0 ? void 0 : _f.getMenuTrigger()) === null || _g === void 0 ? void 0 : _g.closeMenu();
                    break;
                case keycodes.TAB:
                    (_j = (_h = keyManager.activeItem) === null || _h === void 0 ? void 0 : _h.getMenuTrigger()) === null || _j === void 0 ? void 0 : _j.closeMenu();
                    break;
                default:
                    keyManager.onKeydown(event);
            }
        };
        /** Setup the FocusKeyManager with the correct orientation for the menu bar. */
        CdkMenuBar.prototype._setKeyManager = function () {
            var _a;
            this._keyManager = new a11y.FocusKeyManager(this._allItems)
                .withWrap()
                .withTypeAhead()
                .withHomeAndEnd();
            if (this._isHorizontal()) {
                this._keyManager.withHorizontalOrientation(((_a = this._dir) === null || _a === void 0 ? void 0 : _a.value) || 'ltr');
            }
            else {
                this._keyManager.withVerticalOrientation();
            }
        };
        /**
         * Set the FocusMouseManager and ensure that when mouse focus changes the key manager is updated
         * with the latest menu item under mouse focus.
         */
        CdkMenuBar.prototype._subscribeToMouseManager = function () {
            var _this = this;
            this._ngZone.runOutsideAngular(function () {
                _this._mouseFocusChanged = getItemPointerEntries(_this._allItems);
                _this._mouseFocusChanged.pipe(operators.takeUntil(_this._destroyed)).subscribe(function (item) {
                    if (_this._hasOpenSubmenu()) {
                        _this._keyManager.setActiveItem(item);
                    }
                });
            });
        };
        /** Subscribe to the MenuStack close and empty observables. */
        CdkMenuBar.prototype._subscribeToMenuStack = function () {
            var _this = this;
            this._menuStack.closed
                .pipe(operators.takeUntil(this._destroyed))
                .subscribe(function (item) { return _this._closeOpenMenu(item); });
            this._menuStack.emptied
                .pipe(operators.takeUntil(this._destroyed))
                .subscribe(function (event) { return _this._toggleOpenMenu(event); });
        };
        /**
         * Close the open menu if the current active item opened the requested MenuStackItem.
         * @param item the MenuStackItem requested to be closed.
         */
        CdkMenuBar.prototype._closeOpenMenu = function (menu) {
            var _a, _b;
            var trigger = this._openItem;
            var keyManager = this._keyManager;
            if (menu === ((_a = trigger === null || trigger === void 0 ? void 0 : trigger.getMenuTrigger()) === null || _a === void 0 ? void 0 : _a.getMenu())) {
                (_b = trigger.getMenuTrigger()) === null || _b === void 0 ? void 0 : _b.closeMenu();
                keyManager.setFocusOrigin('keyboard');
                keyManager.setActiveItem(trigger);
            }
        };
        /**
         * Set focus to either the current, previous or next item based on the FocusNext event, then
         * open the previous or next item.
         */
        CdkMenuBar.prototype._toggleOpenMenu = function (event) {
            var _a, _b, _c, _d;
            var keyManager = this._keyManager;
            switch (event) {
                case 0 /* nextItem */:
                    keyManager.setFocusOrigin('keyboard');
                    keyManager.setNextItemActive();
                    (_b = (_a = keyManager.activeItem) === null || _a === void 0 ? void 0 : _a.getMenuTrigger()) === null || _b === void 0 ? void 0 : _b.openMenu();
                    break;
                case 1 /* previousItem */:
                    keyManager.setFocusOrigin('keyboard');
                    keyManager.setPreviousItemActive();
                    (_d = (_c = keyManager.activeItem) === null || _c === void 0 ? void 0 : _c.getMenuTrigger()) === null || _d === void 0 ? void 0 : _d.openMenu();
                    break;
                case 2 /* currentItem */:
                    if (keyManager.activeItem) {
                        keyManager.setFocusOrigin('keyboard');
                        keyManager.setActiveItem(keyManager.activeItem);
                    }
                    break;
            }
        };
        /**
         * @return true if the menu bar is configured to be horizontal.
         */
        CdkMenuBar.prototype._isHorizontal = function () {
            return this.orientation === 'horizontal';
        };
        // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
        // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
        // can move this back into `host`.
        // tslint:disable:no-host-decorator-in-concrete
        /** Close any open submenu if there was a click event which occurred outside the menu stack. */
        CdkMenuBar.prototype._closeOnBackgroundClick = function (event) {
            if (this._hasOpenSubmenu()) {
                // get target from composed path to account for shadow dom
                var target = event.composedPath ? event.composedPath()[0] : event.target;
                while (target instanceof Element) {
                    if (isMenuElement(target)) {
                        return;
                    }
                    target = target.parentElement;
                }
                this._menuStack.closeAll();
            }
        };
        /**
         * Subscribe to the menu trigger's open events in order to track the trigger which opened the menu
         * and stop tracking it when the menu is closed.
         */
        CdkMenuBar.prototype._subscribeToMenuOpen = function () {
            var _this = this;
            var exitCondition = rxjs.merge(this._allItems.changes, this._destroyed);
            this._allItems.changes
                .pipe(operators.startWith(this._allItems), operators.mergeMap(function (list) { return list
                .filter(function (item) { return item.hasMenu(); })
                .map(function (item) { return item.getMenuTrigger().opened.pipe(operators.mapTo(item), operators.takeUntil(exitCondition)); }); }), operators.mergeAll(), operators.switchMap(function (item) {
                _this._openItem = item;
                return item.getMenuTrigger().closed;
            }), operators.takeUntil(this._destroyed))
                .subscribe(function () { return (_this._openItem = undefined); });
        };
        /** Return true if the MenuBar has an open submenu. */
        CdkMenuBar.prototype._hasOpenSubmenu = function () {
            return !!this._openItem;
        };
        CdkMenuBar.prototype.ngOnDestroy = function () {
            _super.prototype.ngOnDestroy.call(this);
            this._destroyed.next();
            this._destroyed.complete();
        };
        return CdkMenuBar;
    }(CdkMenuGroup));
    CdkMenuBar.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[cdkMenuBar]',
                    exportAs: 'cdkMenuBar',
                    host: {
                        'role': 'menubar',
                        'class': 'cdk-menu-bar',
                        'tabindex': '0',
                        '[attr.aria-orientation]': 'orientation',
                    },
                    providers: [
                        { provide: CdkMenuGroup, useExisting: CdkMenuBar },
                        { provide: CDK_MENU, useExisting: CdkMenuBar },
                        { provide: MenuStack, useClass: MenuStack },
                    ],
                },] }
    ];
    CdkMenuBar.ctorParameters = function () { return [
        { type: MenuStack },
        { type: i0.NgZone },
        { type: bidi.Directionality, decorators: [{ type: i0.Optional }] }
    ]; };
    CdkMenuBar.propDecorators = {
        orientation: [{ type: i0.Input, args: ['cdkMenuBarOrientation',] }],
        _allItems: [{ type: i0.ContentChildren, args: [CdkMenuItem, { descendants: true },] }],
        focusFirstItem: [{ type: i0.HostListener, args: ['focus',] }],
        _handleKeyEvent: [{ type: i0.HostListener, args: ['keydown', ['$event'],] }],
        _closeOnBackgroundClick: [{ type: i0.HostListener, args: ['document:click', ['$event'],] }]
    };

    /**
     * A directive providing behavior for the the "menuitemradio" ARIA role, which behaves similarly to
     * a conventional radio-button. Any sibling `CdkMenuItemRadio` instances within the same `CdkMenu`
     * or `CdkMenuGroup` comprise a radio group with unique selection enforced.
     */
    var CdkMenuItemRadio = /** @class */ (function (_super) {
        __extends(CdkMenuItemRadio, _super);
        function CdkMenuItemRadio(_selectionDispatcher, element, ngZone, parentMenu, dir, 
        /** Reference to the CdkMenuItemTrigger directive if one is added to the same element */
        // `CdkMenuItemRadio` is commonly used in combination with a `CdkMenuItemTrigger`.
        // tslint:disable-next-line: lightweight-tokens
        menuTrigger) {
            var _this = _super.call(this, element, parentMenu, ngZone, dir, menuTrigger) || this;
            _this._selectionDispatcher = _selectionDispatcher;
            _this._registerDispatcherListener();
            return _this;
        }
        /** Configure the unique selection dispatcher listener in order to toggle the checked state  */
        CdkMenuItemRadio.prototype._registerDispatcherListener = function () {
            var _this = this;
            this._removeDispatcherListener = this._selectionDispatcher.listen(function (id, name) { return (_this.checked = _this.id === id && _this.name === name); });
        };
        // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
        // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
        // can move this back into `host`.
        // tslint:disable:no-host-decorator-in-concrete
        /** Toggles the checked state of the radio-button. */
        CdkMenuItemRadio.prototype.trigger = function () {
            _super.prototype.trigger.call(this);
            if (!this.disabled) {
                this._selectionDispatcher.notify(this.id, this.name);
            }
        };
        CdkMenuItemRadio.prototype.ngOnDestroy = function () {
            _super.prototype.ngOnDestroy.call(this);
            this._removeDispatcherListener();
        };
        return CdkMenuItemRadio;
    }(CdkMenuItemSelectable));
    CdkMenuItemRadio.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[cdkMenuItemRadio]',
                    exportAs: 'cdkMenuItemRadio',
                    host: {
                        'type': 'button',
                        'role': 'menuitemradio',
                        '[attr.aria-checked]': 'checked || null',
                        '[attr.aria-disabled]': 'disabled || null',
                    },
                    providers: [
                        { provide: CdkMenuItemSelectable, useExisting: CdkMenuItemRadio },
                        { provide: CdkMenuItem, useExisting: CdkMenuItemSelectable },
                    ],
                },] }
    ];
    CdkMenuItemRadio.ctorParameters = function () { return [
        { type: collections.UniqueSelectionDispatcher },
        { type: i0.ElementRef },
        { type: i0.NgZone },
        { type: undefined, decorators: [{ type: i0.Inject, args: [CDK_MENU,] }] },
        { type: bidi.Directionality, decorators: [{ type: i0.Optional }] },
        { type: CdkMenuItemTrigger, decorators: [{ type: i0.Self }, { type: i0.Optional }] }
    ]; };
    CdkMenuItemRadio.propDecorators = {
        trigger: [{ type: i0.HostListener, args: ['click',] }]
    };

    /**
     * A directive providing behavior for the "menuitemcheckbox" ARIA role, which behaves similarly to a
     * conventional checkbox.
     */
    var CdkMenuItemCheckbox = /** @class */ (function (_super) {
        __extends(CdkMenuItemCheckbox, _super);
        function CdkMenuItemCheckbox() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
        // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
        // can move this back into `host`.
        // tslint:disable:no-host-decorator-in-concrete
        CdkMenuItemCheckbox.prototype.trigger = function () {
            _super.prototype.trigger.call(this);
            if (!this.disabled) {
                this.checked = !this.checked;
            }
        };
        return CdkMenuItemCheckbox;
    }(CdkMenuItemSelectable));
    CdkMenuItemCheckbox.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[cdkMenuItemCheckbox]',
                    exportAs: 'cdkMenuItemCheckbox',
                    host: {
                        'type': 'button',
                        'role': 'menuitemcheckbox',
                        '[attr.aria-checked]': 'checked || null',
                        '[attr.aria-disabled]': 'disabled || null',
                    },
                    providers: [
                        { provide: CdkMenuItemSelectable, useExisting: CdkMenuItemCheckbox },
                        { provide: CdkMenuItem, useExisting: CdkMenuItemSelectable },
                    ],
                },] }
    ];
    CdkMenuItemCheckbox.propDecorators = {
        trigger: [{ type: i0.HostListener, args: ['click',] }]
    };

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Check if the given element is part of the cdk menu module or nested within a cdk menu element.
     * @param target the element to check.
     * @return true if the given element is part of the menu module or nested within a cdk menu element.
     */
    function isWithinMenuElement(target) {
        while (target instanceof Element) {
            if (target.className.indexOf('cdk-menu') !== -1) {
                return true;
            }
            target = target.parentElement;
        }
        return false;
    }
    /** Tracks the last open context menu trigger across the entire application. */
    var ContextMenuTracker = /** @class */ (function () {
        function ContextMenuTracker() {
        }
        /**
         * Close the previous open context menu and set the given one as being open.
         * @param trigger the trigger for the currently open Context Menu.
         */
        ContextMenuTracker.prototype.update = function (trigger) {
            var _a;
            if (ContextMenuTracker._openContextMenuTrigger !== trigger) {
                (_a = ContextMenuTracker._openContextMenuTrigger) === null || _a === void 0 ? void 0 : _a.close();
                ContextMenuTracker._openContextMenuTrigger = trigger;
            }
        };
        return ContextMenuTracker;
    }());
    ContextMenuTracker.ɵprov = i0.ɵɵdefineInjectable({ factory: function ContextMenuTracker_Factory() { return new ContextMenuTracker(); }, token: ContextMenuTracker, providedIn: "root" });
    ContextMenuTracker.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** Injection token for the ContextMenu options object. */
    var CDK_CONTEXT_MENU_DEFAULT_OPTIONS = new i0.InjectionToken('cdk-context-menu-default-options');
    var ɵ0 = { offsetX: 2, offsetY: 2 };
    /**
     * A directive which when placed on some element opens a the Menu it is bound to when a user
     * right-clicks within that element. It is aware of nested Context Menus and the lowest level
     * non-disabled context menu will trigger.
     */
    var CdkContextMenuTrigger = /** @class */ (function () {
        function CdkContextMenuTrigger(_viewContainerRef, _overlay, _contextMenuTracker, _options, document, _directionality) {
            this._viewContainerRef = _viewContainerRef;
            this._overlay = _overlay;
            this._contextMenuTracker = _contextMenuTracker;
            this._options = _options;
            this._directionality = _directionality;
            /** Emits when the attached menu is requested to open. */
            this.opened = new i0.EventEmitter();
            /** Emits when the attached menu is requested to close. */
            this.closed = new i0.EventEmitter();
            this._disabled = false;
            /** A reference to the overlay which manages the triggered menu. */
            this._overlayRef = null;
            /** Emits when the element is destroyed. */
            this._destroyed = new rxjs.Subject();
            /** Emits when the document listener should stop. */
            this._stopDocumentListener = rxjs.merge(this.closed, this._destroyed);
            /** The menu stack for this trigger and its associated menus. */
            this._menuStack = new MenuStack();
            this._document = document;
            this._setMenuStackListener();
        }
        Object.defineProperty(CdkContextMenuTrigger.prototype, "menuPanel", {
            /** Template reference variable to the menu to open on right click. */
            get: function () {
                return this._menuPanel;
            },
            set: function (panel) {
                this._menuPanel = panel;
                if (this._menuPanel) {
                    this._menuPanel._menuStack = this._menuStack;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CdkContextMenuTrigger.prototype, "disabled", {
            /** Whether the context menu should be disabled. */
            get: function () {
                return this._disabled;
            },
            set: function (value) {
                this._disabled = coercion.coerceBooleanProperty(value);
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Open the attached menu at the specified location.
         * @param coordinates where to open the context menu
         */
        CdkContextMenuTrigger.prototype.open = function (coordinates) {
            if (this.disabled) {
                return;
            }
            else if (this.isOpen()) {
                // since we're moving this menu we need to close any submenus first otherwise they end up
                // disconnected from this one.
                this._menuStack.closeSubMenuOf(this._menuPanel._menu);
                this._overlayRef.getConfig()
                    .positionStrategy.setOrigin(coordinates);
                this._overlayRef.updatePosition();
            }
            else {
                this.opened.next();
                if (this._overlayRef) {
                    this._overlayRef.getConfig()
                        .positionStrategy.setOrigin(coordinates);
                    this._overlayRef.updatePosition();
                }
                else {
                    this._overlayRef = this._overlay.create(this._getOverlayConfig(coordinates));
                }
                this._overlayRef.attach(this._getMenuContent());
                this._setCloseListener();
            }
        };
        /** Close the opened menu. */
        CdkContextMenuTrigger.prototype.close = function () {
            this._menuStack.closeAll();
        };
        /**
         * Open the context menu and close any previously open menus.
         * @param event the mouse event which opens the context menu.
         */
        CdkContextMenuTrigger.prototype._openOnContextMenu = function (event) {
            var _a, _b, _c;
            if (!this.disabled) {
                // Prevent the native context menu from opening because we're opening a custom one.
                event.preventDefault();
                // Stop event propagation to ensure that only the closest enabled context menu opens.
                // Otherwise, any context menus attached to containing elements would *also* open,
                // resulting in multiple stacked context menus being displayed.
                event.stopPropagation();
                this._contextMenuTracker.update(this);
                this.open({ x: event.clientX, y: event.clientY });
                // A context menu can be triggered via a mouse right click or a keyboard shortcut.
                if (event.button === 2) {
                    (_a = this._menuPanel._menu) === null || _a === void 0 ? void 0 : _a.focusFirstItem('mouse');
                }
                else if (event.button === 0) {
                    (_b = this._menuPanel._menu) === null || _b === void 0 ? void 0 : _b.focusFirstItem('keyboard');
                }
                else {
                    (_c = this._menuPanel._menu) === null || _c === void 0 ? void 0 : _c.focusFirstItem('program');
                }
            }
        };
        /** Whether the attached menu is open. */
        CdkContextMenuTrigger.prototype.isOpen = function () {
            var _a;
            return !!((_a = this._overlayRef) === null || _a === void 0 ? void 0 : _a.hasAttached());
        };
        /**
         * Get the configuration object used to create the overlay.
         * @param coordinates the location to place the opened menu
         */
        CdkContextMenuTrigger.prototype._getOverlayConfig = function (coordinates) {
            return new overlay.OverlayConfig({
                positionStrategy: this._getOverlayPositionStrategy(coordinates),
                scrollStrategy: this._overlay.scrollStrategies.block(),
                direction: this._directionality,
            });
        };
        /**
         * Build the position strategy for the overlay which specifies where to place the menu.
         * @param coordinates the location to place the opened menu
         */
        CdkContextMenuTrigger.prototype._getOverlayPositionStrategy = function (coordinates) {
            return this._overlay
                .position()
                .flexibleConnectedTo(coordinates)
                .withDefaultOffsetX(this._options.offsetX)
                .withDefaultOffsetY(this._options.offsetY)
                .withPositions(this._getOverlayPositions());
        };
        /**
         * Determine and return where to position the opened menu relative to the mouse location.
         */
        CdkContextMenuTrigger.prototype._getOverlayPositions = function () {
            // TODO: this should be configurable through the injected context menu options
            return [
                { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'top' },
                { originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'top' },
                { originX: 'end', originY: 'bottom', overlayX: 'start', overlayY: 'bottom' },
                { originX: 'start', originY: 'bottom', overlayX: 'end', overlayY: 'bottom' },
            ];
        };
        /**
         * Get the portal to be attached to the overlay which contains the menu. Allows for the menu
         * content to change dynamically and be reflected in the application.
         */
        CdkContextMenuTrigger.prototype._getMenuContent = function () {
            var _a;
            var hasMenuContentChanged = this.menuPanel._templateRef !== ((_a = this._panelContent) === null || _a === void 0 ? void 0 : _a.templateRef);
            if (this.menuPanel && (!this._panelContent || hasMenuContentChanged)) {
                this._panelContent = new portal.TemplatePortal(this.menuPanel._templateRef, this._viewContainerRef);
            }
            return this._panelContent;
        };
        /**
         * Subscribe to the document click and context menu events and close out the menu when emitted.
         */
        CdkContextMenuTrigger.prototype._setCloseListener = function () {
            var _this = this;
            rxjs.merge(rxjs.fromEvent(this._document, 'click'), rxjs.fromEvent(this._document, 'contextmenu'))
                .pipe(operators.takeUntil(this._stopDocumentListener))
                .subscribe(function (event) {
                var target = event.composedPath ? event.composedPath()[0] : event.target;
                // stop the default context menu from appearing if user right-clicked somewhere outside of
                // any context menu directive or if a user right-clicked inside of the opened menu and just
                // close it.
                if (event.type === 'contextmenu') {
                    if (target instanceof Element && isWithinMenuElement(target)) {
                        // Prevent the native context menu from opening within any open context menu or submenu
                        event.preventDefault();
                    }
                    else {
                        _this.close();
                    }
                }
                else {
                    if (target instanceof Element && !isWithinMenuElement(target)) {
                        _this.close();
                    }
                }
            });
        };
        /** Subscribe to the menu stack close events and close this menu when requested. */
        CdkContextMenuTrigger.prototype._setMenuStackListener = function () {
            var _this = this;
            this._menuStack.closed.pipe(operators.takeUntil(this._destroyed)).subscribe(function (item) {
                if (item === _this._menuPanel._menu && _this.isOpen()) {
                    _this.closed.next();
                    _this._overlayRef.detach();
                }
            });
        };
        CdkContextMenuTrigger.prototype.ngOnDestroy = function () {
            this._destroyOverlay();
            this._destroyed.next();
            this._destroyed.complete();
        };
        /** Destroy and unset the overlay reference it if exists. */
        CdkContextMenuTrigger.prototype._destroyOverlay = function () {
            if (this._overlayRef) {
                this._overlayRef.dispose();
                this._overlayRef = null;
            }
        };
        return CdkContextMenuTrigger;
    }());
    CdkContextMenuTrigger.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[cdkContextMenuTriggerFor]',
                    exportAs: 'cdkContextMenuTriggerFor',
                    host: {
                        '(contextmenu)': '_openOnContextMenu($event)',
                    },
                    providers: [
                        // In cases where the first menu item in the context menu is a trigger the submenu opens on a
                        // hover event. Offsetting the opened context menu by 2px prevents this from occurring.
                        { provide: CDK_CONTEXT_MENU_DEFAULT_OPTIONS, useValue: ɵ0 },
                    ],
                },] }
    ];
    CdkContextMenuTrigger.ctorParameters = function () { return [
        { type: i0.ViewContainerRef },
        { type: overlay.Overlay },
        { type: ContextMenuTracker },
        { type: undefined, decorators: [{ type: i0.Inject, args: [CDK_CONTEXT_MENU_DEFAULT_OPTIONS,] }] },
        { type: undefined, decorators: [{ type: i0.Inject, args: [common.DOCUMENT,] }] },
        { type: bidi.Directionality, decorators: [{ type: i0.Optional }] }
    ]; };
    CdkContextMenuTrigger.propDecorators = {
        menuPanel: [{ type: i0.Input, args: ['cdkContextMenuTriggerFor',] }],
        opened: [{ type: i0.Output, args: ['cdkContextMenuOpened',] }],
        closed: [{ type: i0.Output, args: ['cdkContextMenuClosed',] }],
        disabled: [{ type: i0.Input, args: ['cdkContextMenuDisabled',] }]
    };

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var EXPORTED_DECLARATIONS = [
        CdkMenuBar,
        CdkMenu,
        CdkMenuPanel,
        CdkMenuItem,
        CdkMenuItemRadio,
        CdkMenuItemCheckbox,
        CdkMenuItemTrigger,
        CdkMenuGroup,
        CdkContextMenuTrigger,
    ];
    var CdkMenuModule = /** @class */ (function () {
        function CdkMenuModule() {
        }
        return CdkMenuModule;
    }());
    CdkMenuModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [overlay.OverlayModule],
                    exports: EXPORTED_DECLARATIONS,
                    declarations: EXPORTED_DECLARATIONS,
                },] }
    ];

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.CDK_CONTEXT_MENU_DEFAULT_OPTIONS = CDK_CONTEXT_MENU_DEFAULT_OPTIONS;
    exports.CDK_MENU = CDK_MENU;
    exports.CdkContextMenuTrigger = CdkContextMenuTrigger;
    exports.CdkMenu = CdkMenu;
    exports.CdkMenuBar = CdkMenuBar;
    exports.CdkMenuGroup = CdkMenuGroup;
    exports.CdkMenuItem = CdkMenuItem;
    exports.CdkMenuItemCheckbox = CdkMenuItemCheckbox;
    exports.CdkMenuItemRadio = CdkMenuItemRadio;
    exports.CdkMenuItemTrigger = CdkMenuItemTrigger;
    exports.CdkMenuModule = CdkMenuModule;
    exports.CdkMenuPanel = CdkMenuPanel;
    exports.ContextMenuTracker = ContextMenuTracker;
    exports.MenuStack = MenuStack;
    exports.ɵ0 = ɵ0;
    exports.ɵangular_material_src_cdk_experimental_menu_menu_b = CdkMenuItemSelectable;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=cdk-experimental-menu.umd.js.map
