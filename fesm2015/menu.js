import { InjectionToken, EventEmitter, isDevMode, Directive, ElementRef, ViewContainerRef, Inject, Optional, Input, Output, NgZone, Self, HostListener, ContentChildren, TemplateRef, ɵɵdefineInjectable, Injectable, NgModule } from '@angular/core';
import { OverlayConfig, Overlay, OverlayModule } from '@angular/cdk/overlay';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, ENTER, SPACE, TAB, ESCAPE, hasModifierKey } from '@angular/cdk/keycodes';
import { Directionality } from '@angular/cdk/bidi';
import { filter, takeUntil, startWith, mergeMap, mapTo, mergeAll, take, switchMap } from 'rxjs/operators';
import { Subject, fromEvent, defer, merge } from 'rxjs';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Injection token used to return classes implementing the Menu interface */
const CDK_MENU = new InjectionToken('cdk-menu');

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Throws an exception when a menu panel already has a menu stack.
 * @docs-private
 */
function throwExistingMenuStackError() {
    throw Error('CdkMenuPanel is already referenced by different CdkMenuTrigger. Ensure that a menu is' +
        ' opened by a single trigger only.');
}

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
class CdkMenuItemTrigger {
    constructor(_elementRef, _viewContainerRef, _overlay, _parentMenu, _directionality) {
        this._elementRef = _elementRef;
        this._viewContainerRef = _viewContainerRef;
        this._overlay = _overlay;
        this._parentMenu = _parentMenu;
        this._directionality = _directionality;
        /** Emits when the attached menu is requested to open */
        this.opened = new EventEmitter();
        /** Emits when the attached menu is requested to close */
        this.closed = new EventEmitter();
        /** A reference to the overlay which manages the triggered menu */
        this._overlayRef = null;
    }
    /** Template reference variable to the menu this trigger opens */
    get menuPanel() {
        return this._menuPanel;
    }
    set menuPanel(panel) {
        // If the provided panel already has a stack, that means it already has a trigger configured.
        // Note however that there are some edge cases where two triggers **may** share the same menu,
        // e.g. two triggers in two separate menus.
        // TODO refactor once https://github.com/angular/components/pull/20146 lands
        if (isDevMode() && (panel === null || panel === void 0 ? void 0 : panel._menuStack)) {
            throwExistingMenuStackError();
        }
        this._menuPanel = panel;
        if (this._menuPanel) {
            this._menuPanel._menuStack = this._getMenuStack();
        }
    }
    /** Open/close the attached menu if the trigger has been configured with one */
    toggle() {
        if (this.hasMenu()) {
            this.isMenuOpen() ? this.closeMenu() : this.openMenu();
        }
    }
    /** Open the attached menu. */
    openMenu() {
        if (!this.isMenuOpen()) {
            this.opened.next();
            this._overlayRef = this._overlayRef || this._overlay.create(this._getOverlayConfig());
            this._overlayRef.attach(this._getPortal());
        }
    }
    /** Close the opened menu. */
    closeMenu() {
        if (this.isMenuOpen()) {
            this.closed.next();
            this._overlayRef.detach();
        }
        this._closeSiblingTriggers();
    }
    /** Return true if the trigger has an attached menu */
    hasMenu() {
        return !!this.menuPanel;
    }
    /** Whether the menu this button is a trigger for is open */
    isMenuOpen() {
        return this._overlayRef ? this._overlayRef.hasAttached() : false;
    }
    /**
     * Get a reference to the rendered Menu if the Menu is open and it is visible in the DOM.
     * @return the menu if it is open, otherwise undefined.
     */
    getMenu() {
        var _a;
        return (_a = this.menuPanel) === null || _a === void 0 ? void 0 : _a._menu;
    }
    /**
     * If there are existing open menus and this menu is not open, close sibling menus and open
     * this one.
     */
    _toggleOnMouseEnter() {
        const menuStack = this._getMenuStack();
        const isSiblingMenuOpen = !(menuStack === null || menuStack === void 0 ? void 0 : menuStack.isEmpty()) && !this.isMenuOpen();
        if (isSiblingMenuOpen) {
            this._closeSiblingTriggers();
            this.openMenu();
        }
    }
    /**
     * Handles keyboard events for the menu item, specifically opening/closing the attached menu and
     * focusing the appropriate submenu item.
     * @param event the keyboard event to handle
     */
    _toggleOnKeydown(event) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        const keyCode = event.keyCode;
        switch (keyCode) {
            case SPACE:
            case ENTER:
                event.preventDefault();
                this.toggle();
                (_b = (_a = this.menuPanel) === null || _a === void 0 ? void 0 : _a._menu) === null || _b === void 0 ? void 0 : _b.focusFirstItem('keyboard');
                break;
            case RIGHT_ARROW:
                if (this._isParentVertical()) {
                    event.preventDefault();
                    if (((_c = this._directionality) === null || _c === void 0 ? void 0 : _c.value) === 'rtl') {
                        (_d = this._getMenuStack()) === null || _d === void 0 ? void 0 : _d.close(this._parentMenu, 2 /* currentItem */);
                    }
                    else {
                        this.openMenu();
                        (_f = (_e = this.menuPanel) === null || _e === void 0 ? void 0 : _e._menu) === null || _f === void 0 ? void 0 : _f.focusFirstItem('keyboard');
                    }
                }
                break;
            case LEFT_ARROW:
                if (this._isParentVertical()) {
                    event.preventDefault();
                    if (((_g = this._directionality) === null || _g === void 0 ? void 0 : _g.value) === 'rtl') {
                        this.openMenu();
                        (_j = (_h = this.menuPanel) === null || _h === void 0 ? void 0 : _h._menu) === null || _j === void 0 ? void 0 : _j.focusFirstItem('keyboard');
                    }
                    else {
                        (_k = this._getMenuStack()) === null || _k === void 0 ? void 0 : _k.close(this._parentMenu, 2 /* currentItem */);
                    }
                }
                break;
            case DOWN_ARROW:
            case UP_ARROW:
                if (!this._isParentVertical()) {
                    event.preventDefault();
                    this.openMenu();
                    keyCode === DOWN_ARROW
                        ? (_m = (_l = this.menuPanel) === null || _l === void 0 ? void 0 : _l._menu) === null || _m === void 0 ? void 0 : _m.focusFirstItem('keyboard') : (_p = (_o = this.menuPanel) === null || _o === void 0 ? void 0 : _o._menu) === null || _p === void 0 ? void 0 : _p.focusLastItem('keyboard');
                }
                break;
        }
    }
    /** Close out any sibling menu trigger menus. */
    _closeSiblingTriggers() {
        const menuStack = this._getMenuStack();
        // If nothing was removed from the stack and the last element is not the parent item
        // that means that the parent menu is a menu bar since we don't put the menu bar on the
        // stack
        const isParentMenuBar = !(menuStack === null || menuStack === void 0 ? void 0 : menuStack.closeSubMenuOf(this._parentMenu)) && (menuStack === null || menuStack === void 0 ? void 0 : menuStack.peek()) !== this._parentMenu;
        if (isParentMenuBar) {
            menuStack === null || menuStack === void 0 ? void 0 : menuStack.closeAll();
        }
    }
    /** Get the configuration object used to create the overlay */
    _getOverlayConfig() {
        return new OverlayConfig({
            positionStrategy: this._getOverlayPositionStrategy(),
            scrollStrategy: this._overlay.scrollStrategies.block(),
            direction: this._directionality,
        });
    }
    /** Build the position strategy for the overlay which specifies where to place the menu */
    _getOverlayPositionStrategy() {
        return this._overlay
            .position()
            .flexibleConnectedTo(this._elementRef)
            .withPositions(this._getOverlayPositions());
    }
    /** Determine and return where to position the opened menu relative to the menu item */
    _getOverlayPositions() {
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
    }
    /**
     * Get the portal to be attached to the overlay which contains the menu. Allows for the menu
     * content to change dynamically and be reflected in the application.
     */
    _getPortal() {
        var _a, _b;
        const hasMenuContentChanged = ((_a = this.menuPanel) === null || _a === void 0 ? void 0 : _a._templateRef) !== ((_b = this._panelContent) === null || _b === void 0 ? void 0 : _b.templateRef);
        if (this.menuPanel && (!this._panelContent || hasMenuContentChanged)) {
            this._panelContent = new TemplatePortal(this.menuPanel._templateRef, this._viewContainerRef);
        }
        return this._panelContent;
    }
    /**
     * @return true if if the enclosing parent menu is configured in a vertical orientation.
     */
    _isParentVertical() {
        return this._parentMenu.orientation === 'vertical';
    }
    /** Get the menu stack from the parent. */
    _getMenuStack() {
        // We use a function since at the construction of the MenuItemTrigger the parent Menu won't have
        // its menu stack set. Therefore we need to reference the menu stack from the parent each time
        // we want to use it.
        return this._parentMenu._menuStack;
    }
    ngOnDestroy() {
        this._destroyOverlay();
        this._resetPanelMenuStack();
    }
    /** Set the menu panels menu stack back to null. */
    _resetPanelMenuStack() {
        // If a CdkMenuTrigger is placed in a submenu, each time the trigger is rendered (its parent
        // menu is opened) the panel setter for CdkMenuPanel is called. From the first render onward,
        // the attached CdkMenuPanel has the MenuStack set. Since we throw an error if a panel already
        // has a stack set, we want to reset the attached stack here to prevent the error from being
        // thrown if the trigger re-configures its attached panel (in the case where there is a 1:1
        // relationship between the panel and trigger).
        if (this._menuPanel) {
            this._menuPanel._menuStack = null;
        }
    }
    /** Destroy and unset the overlay reference it if exists */
    _destroyOverlay() {
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._overlayRef = null;
        }
    }
}
CdkMenuItemTrigger.decorators = [
    { type: Directive, args: [{
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
CdkMenuItemTrigger.ctorParameters = () => [
    { type: ElementRef },
    { type: ViewContainerRef },
    { type: Overlay },
    { type: undefined, decorators: [{ type: Inject, args: [CDK_MENU,] }] },
    { type: Directionality, decorators: [{ type: Optional }] }
];
CdkMenuItemTrigger.propDecorators = {
    menuPanel: [{ type: Input, args: ['cdkMenuTriggerFor',] }],
    opened: [{ type: Output, args: ['cdkMenuOpened',] }],
    closed: [{ type: Output, args: ['cdkMenuClosed',] }]
};

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// TODO refactor this to be configurable allowing for custom elements to be removed
/** Removes all icons from within the given element. */
function removeIcons(element) {
    var _a;
    for (const icon of Array.from(element.querySelectorAll('mat-icon, .material-icons'))) {
        (_a = icon.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(icon);
    }
}
/**
 * Directive which provides the ability for an element to be focused and navigated to using the
 * keyboard when residing in a CdkMenu, CdkMenuBar, or CdkMenuGroup. It performs user defined
 * behavior when clicked.
 */
class CdkMenuItem {
    constructor(_elementRef, _parentMenu, _ngZone, _dir, 
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
        this.triggered = new EventEmitter();
        /**
         * The tabindex for this menu item managed internally and used for implementing roving a
         * tab index.
         */
        this._tabindex = -1;
        /** Emits when the menu item is destroyed. */
        this._destroyed = new Subject();
        this._setupMouseEnter();
    }
    /**  Whether the CdkMenuItem is disabled - defaults to false */
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    /** Place focus on the element. */
    focus() {
        this._elementRef.nativeElement.focus();
    }
    // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
    // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
    // can move this back into `host`.
    // tslint:disable:no-host-decorator-in-concrete
    /** Reset the _tabindex to -1. */
    _resetTabIndex() {
        this._tabindex = -1;
    }
    // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
    // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
    // can move this back into `host`.
    // tslint:disable:no-host-decorator-in-concrete
    /**
     * Set the tab index to 0 if not disabled and it's a focus event, or a mouse enter if this element
     * is not in a menu bar.
     */
    _setTabIndex(event) {
        var _a;
        if (this.disabled) {
            return;
        }
        // don't set the tabindex if there are no open sibling or parent menus
        if (!event || !((_a = this._getMenuStack()) === null || _a === void 0 ? void 0 : _a.isEmpty())) {
            this._tabindex = 0;
        }
    }
    // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
    // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
    // can move this back into `host`.
    // tslint:disable:no-host-decorator-in-concrete
    /**
     * If the menu item is not disabled and the element does not have a menu trigger attached, emit
     * on the cdkMenuItemTriggered emitter and close all open menus.
     */
    trigger() {
        var _a;
        if (!this.disabled && !this.hasMenu()) {
            this.triggered.next();
            (_a = this._getMenuStack()) === null || _a === void 0 ? void 0 : _a.closeAll();
        }
    }
    /** Whether the menu item opens a menu. */
    hasMenu() {
        var _a;
        return !!((_a = this._menuTrigger) === null || _a === void 0 ? void 0 : _a.hasMenu());
    }
    /** Return true if this MenuItem has an attached menu and it is open. */
    isMenuOpen() {
        var _a;
        return !!((_a = this._menuTrigger) === null || _a === void 0 ? void 0 : _a.isMenuOpen());
    }
    /**
     * Get a reference to the rendered Menu if the Menu is open and it is visible in the DOM.
     * @return the menu if it is open, otherwise undefined.
     */
    getMenu() {
        var _a;
        return (_a = this._menuTrigger) === null || _a === void 0 ? void 0 : _a.getMenu();
    }
    /** Get the MenuItemTrigger associated with this element. */
    getMenuTrigger() {
        return this._menuTrigger;
    }
    /** Get the label for this element which is required by the FocusableOption interface. */
    getLabel() {
        var _a;
        // TODO cloning the tree may be expensive; implement a better method
        // we know that the current node is an element type
        const clone = this._elementRef.nativeElement.cloneNode(true);
        removeIcons(clone);
        return ((_a = clone.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '';
    }
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
    _onKeydown(event) {
        var _a, _b, _c, _d, _e, _f;
        switch (event.keyCode) {
            case SPACE:
            case ENTER:
                event.preventDefault();
                this.trigger();
                break;
            case RIGHT_ARROW:
                if (this._isParentVertical() && !this.hasMenu()) {
                    event.preventDefault();
                    ((_a = this._dir) === null || _a === void 0 ? void 0 : _a.value) === 'rtl'
                        ? (_b = this._getMenuStack()) === null || _b === void 0 ? void 0 : _b.close(this._parentMenu, 1 /* previousItem */) : (_c = this._getMenuStack()) === null || _c === void 0 ? void 0 : _c.closeAll(0 /* nextItem */);
                }
                break;
            case LEFT_ARROW:
                if (this._isParentVertical() && !this.hasMenu()) {
                    event.preventDefault();
                    ((_d = this._dir) === null || _d === void 0 ? void 0 : _d.value) === 'rtl'
                        ? (_e = this._getMenuStack()) === null || _e === void 0 ? void 0 : _e.closeAll(0 /* nextItem */) : (_f = this._getMenuStack()) === null || _f === void 0 ? void 0 : _f.close(this._parentMenu, 1 /* previousItem */);
                }
                break;
        }
    }
    /**
     * Subscribe to the mouseenter events and close any sibling menu items if this element is moused
     * into.
     */
    _setupMouseEnter() {
        this._ngZone.runOutsideAngular(() => fromEvent(this._elementRef.nativeElement, 'mouseenter')
            .pipe(filter(() => { var _a; return !((_a = this._getMenuStack()) === null || _a === void 0 ? void 0 : _a.isEmpty()) && !this.hasMenu(); }), takeUntil(this._destroyed))
            .subscribe(() => {
            this._ngZone.run(() => { var _a; return (_a = this._getMenuStack()) === null || _a === void 0 ? void 0 : _a.closeSubMenuOf(this._parentMenu); });
        }));
    }
    /** Return true if the enclosing parent menu is configured in a horizontal orientation. */
    _isParentVertical() {
        return this._parentMenu.orientation === 'vertical';
    }
    /** Get the MenuStack from the parent menu. */
    _getMenuStack() {
        // We use a function since at the construction of the MenuItemTrigger the parent Menu won't have
        // its menu stack set. Therefore we need to reference the menu stack from the parent each time
        // we want to use it.
        return this._parentMenu._menuStack;
    }
    ngOnDestroy() {
        this._destroyed.next();
    }
}
CdkMenuItem.decorators = [
    { type: Directive, args: [{
                selector: '[cdkMenuItem]',
                exportAs: 'cdkMenuItem',
                host: {
                    '[tabindex]': '_tabindex',
                    'type': 'button',
                    'role': 'menuitem',
                    'class': 'cdk-menu-item',
                    '[attr.aria-disabled]': 'disabled || null',
                },
            },] }
];
CdkMenuItem.ctorParameters = () => [
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Inject, args: [CDK_MENU,] }] },
    { type: NgZone },
    { type: Directionality, decorators: [{ type: Optional }] },
    { type: CdkMenuItemTrigger, decorators: [{ type: Self }, { type: Optional }] }
];
CdkMenuItem.propDecorators = {
    disabled: [{ type: Input }],
    triggered: [{ type: Output, args: ['cdkMenuItemTriggered',] }],
    _resetTabIndex: [{ type: HostListener, args: ['blur',] }, { type: HostListener, args: ['mouseout',] }],
    _setTabIndex: [{ type: HostListener, args: ['focus',] }, { type: HostListener, args: ['mouseenter', ['$event'],] }],
    trigger: [{ type: HostListener, args: ['click',] }],
    _onKeydown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Counter used to set a unique id and name for a selectable item */
let nextId = 0;
/**
 * Base class providing checked state for MenuItems along with outputting a clicked event when the
 * element is triggered. It provides functionality for selectable elements.
 */
class CdkMenuItemSelectable extends CdkMenuItem {
    constructor() {
        super(...arguments);
        /** Event emitted when the selectable item is clicked */
        this.toggled = new EventEmitter();
        this._checked = false;
        /** The name of the selectable element with a default value */
        this.name = `cdk-selectable-item-${nextId++}`;
        /** The id of the selectable element with a default value */
        this.id = `cdk-selectable-item-${nextId++}`;
    }
    /** Whether the element is checked */
    get checked() {
        return this._checked;
    }
    set checked(value) {
        this._checked = coerceBooleanProperty(value);
    }
    /** If the element is not disabled emit the click event */
    trigger() {
        if (!this.disabled) {
            this.toggled.next(this);
        }
    }
}
CdkMenuItemSelectable.decorators = [
    { type: Directive }
];
CdkMenuItemSelectable.propDecorators = {
    toggled: [{ type: Output, args: ['cdkMenuItemToggled',] }],
    checked: [{ type: Input }],
    name: [{ type: Input }],
    id: [{ type: Input }]
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
class CdkMenuGroup {
    constructor() {
        /** Emits the element when checkbox or radiobutton state changed  */
        this.change = new EventEmitter();
        /** Emits when the _selectableItems QueryList triggers a change */
        this._selectableChanges = new EventEmitter();
    }
    ngAfterContentInit() {
        this._registerMenuSelectionListeners();
    }
    /**
     * Register the child selectable elements with the change emitter and ensure any new child
     * elements do so as well.
     */
    _registerMenuSelectionListeners() {
        this._selectableItems.forEach(selectable => this._registerClickListener(selectable));
        this._selectableItems.changes.subscribe((selectableItems) => {
            this._selectableChanges.next();
            selectableItems.forEach(selectable => this._registerClickListener(selectable));
        });
    }
    /** Register each selectable to emit on the change Emitter when clicked */
    _registerClickListener(selectable) {
        selectable.toggled
            .pipe(takeUntil(this._selectableChanges))
            .subscribe(() => this.change.next(selectable));
    }
    ngOnDestroy() {
        this._selectableChanges.next();
        this._selectableChanges.complete();
    }
}
CdkMenuGroup.decorators = [
    { type: Directive, args: [{
                selector: '[cdkMenuGroup]',
                exportAs: 'cdkMenuGroup',
                host: {
                    'role': 'group',
                    'class': 'cdk-menu-group',
                },
                providers: [{ provide: UniqueSelectionDispatcher, useClass: UniqueSelectionDispatcher }],
            },] }
];
CdkMenuGroup.propDecorators = {
    change: [{ type: Output }],
    _selectableItems: [{ type: ContentChildren, args: [CdkMenuItemSelectable, { descendants: true },] }]
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
class CdkMenuPanel {
    constructor(_templateRef) {
        this._templateRef = _templateRef;
    }
    /**
     * Set the Menu component on the menu panel. Since we cannot use ContentChild to fetch the
     * child Menu component, the child Menu must register its self with the parent MenuPanel.
     */
    _registerMenu(child) {
        var _a;
        this._menu = child;
        // The ideal solution would be to affect the CdkMenuPanel injector from the CdkMenuTrigger and
        // inject the menu stack reference into the child menu and menu items, however this isn't
        // possible at this time.
        this._menu._menuStack = this._menuStack;
        (_a = this._menuStack) === null || _a === void 0 ? void 0 : _a.push(child);
    }
}
CdkMenuPanel.decorators = [
    { type: Directive, args: [{ selector: 'ng-template[cdkMenuPanel]', exportAs: 'cdkMenuPanel' },] }
];
CdkMenuPanel.ctorParameters = () => [
    { type: TemplateRef }
];

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * MenuStack allows subscribers to listen for close events (when a MenuStackItem is popped off
 * of the stack) in order to perform closing actions. Upon the MenuStack being empty it emits
 * from the `empty` observable specifying the next focus action which the listener should perform
 * as requested by the closer.
 */
class MenuStack {
    constructor() {
        /** All MenuStackItems tracked by this MenuStack. */
        this._elements = [];
        /** Emits the element which was popped off of the stack when requested by a closer. */
        this._close = new Subject();
        /** Emits once the MenuStack has become empty after popping off elements. */
        this._empty = new Subject();
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
    push(menu) {
        this._elements.push(menu);
    }
    /**
     * Pop items off of the stack up to and including `lastItem` and emit each on the close
     * observable. If the stack is empty or `lastItem` is not on the stack it does nothing.
     * @param lastItem the last item to pop off the stack.
     * @param focusNext the event to emit on the `empty` observable if the method call resulted in an
     * empty stack. Does not emit if the stack was initially empty or if `lastItem` was not on the
     * stack.
     */
    close(lastItem, focusNext) {
        if (this._elements.indexOf(lastItem) >= 0) {
            let poppedElement;
            do {
                poppedElement = this._elements.pop();
                this._close.next(poppedElement);
            } while (poppedElement !== lastItem);
            if (this.isEmpty()) {
                this._empty.next(focusNext);
            }
        }
    }
    /**
     * Pop items off of the stack up to but excluding `lastItem` and emit each on the close
     * observable. If the stack is empty or `lastItem` is not on the stack it does nothing.
     * @param lastItem the element which should be left on the stack
     * @return whether or not an item was removed from the stack
     */
    closeSubMenuOf(lastItem) {
        let removed = false;
        if (this._elements.indexOf(lastItem) >= 0) {
            removed = this.peek() !== lastItem;
            while (this.peek() !== lastItem) {
                this._close.next(this._elements.pop());
            }
        }
        return removed;
    }
    /**
     * Pop off all MenuStackItems and emit each one on the `close` observable one by one.
     * @param focusNext the event to emit on the `empty` observable once the stack is emptied. Does
     * not emit if the stack was initially empty.
     */
    closeAll(focusNext) {
        if (!this.isEmpty()) {
            while (!this.isEmpty()) {
                const menuStackItem = this._elements.pop();
                if (menuStackItem) {
                    this._close.next(menuStackItem);
                }
            }
            this._empty.next(focusNext);
        }
    }
    /** Return true if this stack is empty. */
    isEmpty() {
        return !this._elements.length;
    }
    /** Return the length of the stack. */
    length() {
        return this._elements.length;
    }
    /** Get the top most element on the stack. */
    peek() {
        return this._elements[this._elements.length - 1];
    }
}
/** NoopMenuStack is a placeholder MenuStack used for inline menus. */
class NoopMenuStack extends MenuStack {
    /** Noop push - does not add elements to the MenuStack. */
    push(_) { }
}

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
    return defer(() => items.changes.pipe(startWith(items), mergeMap((list) => list.map(element => fromEvent(element._elementRef.nativeElement, 'mouseenter').pipe(mapTo(element), takeUntil(items.changes)))), mergeAll()));
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Directive which configures the element as a Menu which should contain child elements marked as
 * CdkMenuItem or CdkMenuGroup. Sets the appropriate role and aria-attributes for a menu and
 * contains accessible keyboard and mouse handling logic.
 *
 * It also acts as a RadioGroup for elements marked with role `menuitemradio`.
 */
class CdkMenu extends CdkMenuGroup {
    constructor(_ngZone, _dir, 
    // `CdkMenuPanel` is always used in combination with a `CdkMenu`.
    // tslint:disable-next-line: lightweight-tokens
    _menuPanel) {
        super();
        this._ngZone = _ngZone;
        this._dir = _dir;
        this._menuPanel = _menuPanel;
        /**
         * Sets the aria-orientation attribute and determines where menus will be opened.
         * Does not affect styling/layout.
         */
        this.orientation = 'vertical';
        /** Event emitted when the menu is closed. */
        this.closed = new EventEmitter();
        // We provide a default MenuStack implementation in case the menu is an inline menu.
        // For Menus part of a MenuBar nested within a MenuPanel this will be overwritten
        // to the correct parent MenuStack.
        /** Track the Menus making up the open menu stack. */
        this._menuStack = new NoopMenuStack();
    }
    ngOnInit() {
        this._registerWithParentPanel();
    }
    ngAfterContentInit() {
        super.ngAfterContentInit();
        this._completeChangeEmitter();
        this._setKeyManager();
        this._subscribeToMenuOpen();
        this._subscribeToMenuStack();
        this._subscribeToMouseManager();
    }
    // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
    // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
    // can move this back into `host`.
    // tslint:disable:no-host-decorator-in-concrete
    /** Place focus on the first MenuItem in the menu and set the focus origin. */
    focusFirstItem(focusOrigin = 'program') {
        this._keyManager.setFocusOrigin(focusOrigin);
        this._keyManager.setFirstItemActive();
    }
    /** Place focus on the last MenuItem in the menu and set the focus origin. */
    focusLastItem(focusOrigin = 'program') {
        this._keyManager.setFocusOrigin(focusOrigin);
        this._keyManager.setLastItemActive();
    }
    // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
    // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
    // can move this back into `host`.
    // tslint:disable:no-host-decorator-in-concrete
    /** Handle keyboard events for the Menu. */
    _handleKeyEvent(event) {
        const keyManager = this._keyManager;
        switch (event.keyCode) {
            case LEFT_ARROW:
            case RIGHT_ARROW:
                if (this._isHorizontal()) {
                    event.preventDefault();
                    keyManager.setFocusOrigin('keyboard');
                    keyManager.onKeydown(event);
                }
                break;
            case UP_ARROW:
            case DOWN_ARROW:
                if (!this._isHorizontal()) {
                    event.preventDefault();
                    keyManager.setFocusOrigin('keyboard');
                    keyManager.onKeydown(event);
                }
                break;
            case ESCAPE:
                if (!hasModifierKey(event)) {
                    event.preventDefault();
                    this._menuStack.close(this, 2 /* currentItem */);
                }
                break;
            case TAB:
                this._menuStack.closeAll();
                break;
            default:
                keyManager.onKeydown(event);
        }
    }
    /** Register this menu with its enclosing parent menu panel */
    _registerWithParentPanel() {
        var _a;
        (_a = this._getMenuPanel()) === null || _a === void 0 ? void 0 : _a._registerMenu(this);
    }
    /**
     * Get the enclosing CdkMenuPanel defaulting to the injected reference over the developer
     * provided reference.
     */
    _getMenuPanel() {
        return this._menuPanel || this._explicitPanel;
    }
    /**
     * Complete the change emitter if there are any nested MenuGroups or register to complete the
     * change emitter if a MenuGroup is rendered at some point
     */
    _completeChangeEmitter() {
        if (this._hasNestedGroups()) {
            this.change.complete();
        }
        else {
            this._nestedGroups.changes.pipe(take(1)).subscribe(() => this.change.complete());
        }
    }
    /** Return true if there are nested CdkMenuGroup elements within the Menu */
    _hasNestedGroups() {
        // view engine has a bug where @ContentChildren will return the current element
        // along with children if the selectors match - not just the children.
        // Here, if there is at least one element, we check to see if the first element is a CdkMenu in
        // order to ensure that we return true iff there are child CdkMenuGroup elements.
        return this._nestedGroups.length > 0 && !(this._nestedGroups.first instanceof CdkMenu);
    }
    /** Setup the FocusKeyManager with the correct orientation for the menu. */
    _setKeyManager() {
        var _a;
        this._keyManager = new FocusKeyManager(this._allItems)
            .withWrap()
            .withTypeAhead()
            .withHomeAndEnd();
        if (this._isHorizontal()) {
            this._keyManager.withHorizontalOrientation(((_a = this._dir) === null || _a === void 0 ? void 0 : _a.value) || 'ltr');
        }
        else {
            this._keyManager.withVerticalOrientation();
        }
    }
    /**
     * Set the FocusMouseManager and ensure that when mouse focus changes the key manager is updated
     * with the latest menu item under mouse focus.
     */
    _subscribeToMouseManager() {
        this._ngZone.runOutsideAngular(() => {
            this._mouseFocusChanged = getItemPointerEntries(this._allItems);
            this._mouseFocusChanged
                .pipe(takeUntil(this.closed))
                .subscribe(item => this._keyManager.setActiveItem(item));
        });
    }
    /** Subscribe to the MenuStack close and empty observables. */
    _subscribeToMenuStack() {
        this._menuStack.closed
            .pipe(takeUntil(this.closed))
            .subscribe((item) => this._closeOpenMenu(item));
        this._menuStack.emptied
            .pipe(takeUntil(this.closed))
            .subscribe((event) => this._toggleMenuFocus(event));
    }
    /**
     * Close the open menu if the current active item opened the requested MenuStackItem.
     * @param item the MenuStackItem requested to be closed.
     */
    _closeOpenMenu(menu) {
        var _a, _b;
        const keyManager = this._keyManager;
        const trigger = this._openItem;
        if (menu === ((_a = trigger === null || trigger === void 0 ? void 0 : trigger.getMenuTrigger()) === null || _a === void 0 ? void 0 : _a.getMenu())) {
            (_b = trigger.getMenuTrigger()) === null || _b === void 0 ? void 0 : _b.closeMenu();
            keyManager.setFocusOrigin('keyboard');
            keyManager.setActiveItem(trigger);
        }
    }
    /** Set focus the either the current, previous or next item based on the FocusNext event. */
    _toggleMenuFocus(event) {
        const keyManager = this._keyManager;
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
    }
    // TODO(andy9775): remove duplicate logic between menu an menu bar
    /**
     * Subscribe to the menu trigger's open events in order to track the trigger which opened the menu
     * and stop tracking it when the menu is closed.
     */
    _subscribeToMenuOpen() {
        const exitCondition = merge(this._allItems.changes, this.closed);
        this._allItems.changes
            .pipe(startWith(this._allItems), mergeMap((list) => list
            .filter(item => item.hasMenu())
            .map(item => item.getMenuTrigger().opened.pipe(mapTo(item), takeUntil(exitCondition)))), mergeAll(), switchMap((item) => {
            this._openItem = item;
            return item.getMenuTrigger().closed;
        }), takeUntil(this.closed))
            .subscribe(() => (this._openItem = undefined));
    }
    /** Return true if this menu has been configured in a horizontal orientation. */
    _isHorizontal() {
        return this.orientation === 'horizontal';
    }
    /**
     * Return true if this menu is an inline menu. That is, it does not exist in a pop-up and is
     * always visible in the dom.
     */
    _isInline() {
        // NoopMenuStack is the default. If this menu is not inline than the NoopMenuStack is replaced
        // automatically.
        return this._menuStack instanceof NoopMenuStack;
    }
    ngOnDestroy() {
        this._emitClosedEvent();
    }
    /** Emit and complete the closed event emitter */
    _emitClosedEvent() {
        this.closed.next();
        this.closed.complete();
    }
}
CdkMenu.decorators = [
    { type: Directive, args: [{
                selector: '[cdkMenu]',
                exportAs: 'cdkMenu',
                host: {
                    '[tabindex]': '_isInline() ? 0 : null',
                    'role': 'menu',
                    'class': 'cdk-menu',
                    '[class.cdk-menu-inline]': '_isInline()',
                    '[attr.aria-orientation]': 'orientation',
                },
                providers: [
                    { provide: CdkMenuGroup, useExisting: CdkMenu },
                    { provide: CDK_MENU, useExisting: CdkMenu },
                ],
            },] }
];
CdkMenu.ctorParameters = () => [
    { type: NgZone },
    { type: Directionality, decorators: [{ type: Optional }] },
    { type: CdkMenuPanel, decorators: [{ type: Optional }] }
];
CdkMenu.propDecorators = {
    orientation: [{ type: Input, args: ['cdkMenuOrientation',] }],
    closed: [{ type: Output }],
    _nestedGroups: [{ type: ContentChildren, args: [CdkMenuGroup, { descendants: true },] }],
    _allItems: [{ type: ContentChildren, args: [CdkMenuItem, { descendants: true },] }],
    _explicitPanel: [{ type: Input, args: ['cdkMenuPanel',] }],
    focusFirstItem: [{ type: HostListener, args: ['focus',] }],
    _handleKeyEvent: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Whether the element is a menu bar or a popup menu.
 * @param target the element to check.
 * @return true if the given element is part of the menu module.
 */
function isMenuElement(target) {
    return (target.classList.contains('cdk-menu-bar') ||
        (target.classList.contains('cdk-menu') && !target.classList.contains('cdk-menu-inline')));
}
/**
 * Directive applied to an element which configures it as a MenuBar by setting the appropriate
 * role, aria attributes, and accessible keyboard and mouse handling logic. The component that
 * this directive is applied to should contain components marked with CdkMenuItem.
 *
 */
class CdkMenuBar extends CdkMenuGroup {
    constructor(_menuStack, _ngZone, _dir) {
        super();
        this._menuStack = _menuStack;
        this._ngZone = _ngZone;
        this._dir = _dir;
        /**
         * Sets the aria-orientation attribute and determines where menus will be opened.
         * Does not affect styling/layout.
         */
        this.orientation = 'horizontal';
        /** Emits when the MenuBar is destroyed. */
        this._destroyed = new Subject();
    }
    ngAfterContentInit() {
        super.ngAfterContentInit();
        this._setKeyManager();
        this._subscribeToMenuOpen();
        this._subscribeToMenuStack();
        this._subscribeToMouseManager();
    }
    // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
    // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
    // can move this back into `host`.
    // tslint:disable:no-host-decorator-in-concrete
    /** Place focus on the first MenuItem in the menu and set the focus origin. */
    focusFirstItem(focusOrigin = 'program') {
        this._keyManager.setFocusOrigin(focusOrigin);
        this._keyManager.setFirstItemActive();
    }
    /** Place focus on the last MenuItem in the menu and set the focus origin. */
    focusLastItem(focusOrigin = 'program') {
        this._keyManager.setFocusOrigin(focusOrigin);
        this._keyManager.setLastItemActive();
    }
    // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
    // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
    // can move this back into `host`.
    // tslint:disable:no-host-decorator-in-concrete
    /**
     * Handle keyboard events, specifically changing the focused element and/or toggling the active
     * items menu.
     * @param event the KeyboardEvent to handle.
     */
    _handleKeyEvent(event) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const keyManager = this._keyManager;
        switch (event.keyCode) {
            case UP_ARROW:
            case DOWN_ARROW:
            case LEFT_ARROW:
            case RIGHT_ARROW:
                const horizontalArrows = event.keyCode === LEFT_ARROW || event.keyCode === RIGHT_ARROW;
                // For a horizontal menu if the left/right keys were clicked, or a vertical menu if the
                // up/down keys were clicked: if the current menu is open, close it then focus and open the
                // next  menu.
                if ((this._isHorizontal() && horizontalArrows) ||
                    (!this._isHorizontal() && !horizontalArrows)) {
                    event.preventDefault();
                    const prevIsOpen = (_a = keyManager.activeItem) === null || _a === void 0 ? void 0 : _a.isMenuOpen();
                    (_c = (_b = keyManager.activeItem) === null || _b === void 0 ? void 0 : _b.getMenuTrigger()) === null || _c === void 0 ? void 0 : _c.closeMenu();
                    keyManager.setFocusOrigin('keyboard');
                    keyManager.onKeydown(event);
                    if (prevIsOpen) {
                        (_e = (_d = keyManager.activeItem) === null || _d === void 0 ? void 0 : _d.getMenuTrigger()) === null || _e === void 0 ? void 0 : _e.openMenu();
                    }
                }
                break;
            case ESCAPE:
                event.preventDefault();
                (_g = (_f = keyManager.activeItem) === null || _f === void 0 ? void 0 : _f.getMenuTrigger()) === null || _g === void 0 ? void 0 : _g.closeMenu();
                break;
            case TAB:
                (_j = (_h = keyManager.activeItem) === null || _h === void 0 ? void 0 : _h.getMenuTrigger()) === null || _j === void 0 ? void 0 : _j.closeMenu();
                break;
            default:
                keyManager.onKeydown(event);
        }
    }
    /** Setup the FocusKeyManager with the correct orientation for the menu bar. */
    _setKeyManager() {
        var _a;
        this._keyManager = new FocusKeyManager(this._allItems)
            .withWrap()
            .withTypeAhead()
            .withHomeAndEnd();
        if (this._isHorizontal()) {
            this._keyManager.withHorizontalOrientation(((_a = this._dir) === null || _a === void 0 ? void 0 : _a.value) || 'ltr');
        }
        else {
            this._keyManager.withVerticalOrientation();
        }
    }
    /**
     * Set the FocusMouseManager and ensure that when mouse focus changes the key manager is updated
     * with the latest menu item under mouse focus.
     */
    _subscribeToMouseManager() {
        this._ngZone.runOutsideAngular(() => {
            this._mouseFocusChanged = getItemPointerEntries(this._allItems);
            this._mouseFocusChanged.pipe(takeUntil(this._destroyed)).subscribe(item => {
                if (this._hasOpenSubmenu()) {
                    this._keyManager.setActiveItem(item);
                }
            });
        });
    }
    /** Subscribe to the MenuStack close and empty observables. */
    _subscribeToMenuStack() {
        this._menuStack.closed
            .pipe(takeUntil(this._destroyed))
            .subscribe((item) => this._closeOpenMenu(item));
        this._menuStack.emptied
            .pipe(takeUntil(this._destroyed))
            .subscribe((event) => this._toggleOpenMenu(event));
    }
    /**
     * Close the open menu if the current active item opened the requested MenuStackItem.
     * @param item the MenuStackItem requested to be closed.
     */
    _closeOpenMenu(menu) {
        var _a, _b;
        const trigger = this._openItem;
        const keyManager = this._keyManager;
        if (menu === ((_a = trigger === null || trigger === void 0 ? void 0 : trigger.getMenuTrigger()) === null || _a === void 0 ? void 0 : _a.getMenu())) {
            (_b = trigger.getMenuTrigger()) === null || _b === void 0 ? void 0 : _b.closeMenu();
            keyManager.setFocusOrigin('keyboard');
            keyManager.setActiveItem(trigger);
        }
    }
    /**
     * Set focus to either the current, previous or next item based on the FocusNext event, then
     * open the previous or next item.
     */
    _toggleOpenMenu(event) {
        var _a, _b, _c, _d;
        const keyManager = this._keyManager;
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
    }
    /**
     * @return true if the menu bar is configured to be horizontal.
     */
    _isHorizontal() {
        return this.orientation === 'horizontal';
    }
    // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
    // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
    // can move this back into `host`.
    // tslint:disable:no-host-decorator-in-concrete
    /** Close any open submenu if there was a click event which occurred outside the menu stack. */
    _closeOnBackgroundClick(event) {
        if (this._hasOpenSubmenu()) {
            // get target from composed path to account for shadow dom
            let target = event.composedPath ? event.composedPath()[0] : event.target;
            while (target instanceof Element) {
                if (isMenuElement(target)) {
                    return;
                }
                target = target.parentElement;
            }
            this._menuStack.closeAll();
        }
    }
    /**
     * Subscribe to the menu trigger's open events in order to track the trigger which opened the menu
     * and stop tracking it when the menu is closed.
     */
    _subscribeToMenuOpen() {
        const exitCondition = merge(this._allItems.changes, this._destroyed);
        this._allItems.changes
            .pipe(startWith(this._allItems), mergeMap((list) => list
            .filter(item => item.hasMenu())
            .map(item => item.getMenuTrigger().opened.pipe(mapTo(item), takeUntil(exitCondition)))), mergeAll(), switchMap((item) => {
            this._openItem = item;
            return item.getMenuTrigger().closed;
        }), takeUntil(this._destroyed))
            .subscribe(() => (this._openItem = undefined));
    }
    /** Return true if the MenuBar has an open submenu. */
    _hasOpenSubmenu() {
        return !!this._openItem;
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this._destroyed.next();
        this._destroyed.complete();
    }
}
CdkMenuBar.decorators = [
    { type: Directive, args: [{
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
CdkMenuBar.ctorParameters = () => [
    { type: MenuStack },
    { type: NgZone },
    { type: Directionality, decorators: [{ type: Optional }] }
];
CdkMenuBar.propDecorators = {
    orientation: [{ type: Input, args: ['cdkMenuBarOrientation',] }],
    _allItems: [{ type: ContentChildren, args: [CdkMenuItem, { descendants: true },] }],
    focusFirstItem: [{ type: HostListener, args: ['focus',] }],
    _handleKeyEvent: [{ type: HostListener, args: ['keydown', ['$event'],] }],
    _closeOnBackgroundClick: [{ type: HostListener, args: ['document:mousedown', ['$event'],] }]
};

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A directive providing behavior for the the "menuitemradio" ARIA role, which behaves similarly to
 * a conventional radio-button. Any sibling `CdkMenuItemRadio` instances within the same `CdkMenu`
 * or `CdkMenuGroup` comprise a radio group with unique selection enforced.
 */
class CdkMenuItemRadio extends CdkMenuItemSelectable {
    constructor(_selectionDispatcher, element, ngZone, parentMenu, dir, 
    /** Reference to the CdkMenuItemTrigger directive if one is added to the same element */
    // `CdkMenuItemRadio` is commonly used in combination with a `CdkMenuItemTrigger`.
    // tslint:disable-next-line: lightweight-tokens
    menuTrigger) {
        super(element, parentMenu, ngZone, dir, menuTrigger);
        this._selectionDispatcher = _selectionDispatcher;
        this._registerDispatcherListener();
    }
    /** Configure the unique selection dispatcher listener in order to toggle the checked state  */
    _registerDispatcherListener() {
        this._removeDispatcherListener = this._selectionDispatcher.listen((id, name) => (this.checked = this.id === id && this.name === name));
    }
    /** Toggles the checked state of the radio-button. */
    trigger() {
        super.trigger();
        if (!this.disabled) {
            this._selectionDispatcher.notify(this.id, this.name);
        }
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this._removeDispatcherListener();
    }
}
CdkMenuItemRadio.decorators = [
    { type: Directive, args: [{
                selector: '[cdkMenuItemRadio]',
                exportAs: 'cdkMenuItemRadio',
                host: {
                    '[tabindex]': '_tabindex',
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
CdkMenuItemRadio.ctorParameters = () => [
    { type: UniqueSelectionDispatcher },
    { type: ElementRef },
    { type: NgZone },
    { type: undefined, decorators: [{ type: Inject, args: [CDK_MENU,] }] },
    { type: Directionality, decorators: [{ type: Optional }] },
    { type: CdkMenuItemTrigger, decorators: [{ type: Self }, { type: Optional }] }
];

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A directive providing behavior for the "menuitemcheckbox" ARIA role, which behaves similarly to a
 * conventional checkbox.
 */
class CdkMenuItemCheckbox extends CdkMenuItemSelectable {
    /** Toggle the checked state of the checkbox. */
    trigger() {
        super.trigger();
        if (!this.disabled) {
            this.checked = !this.checked;
        }
    }
}
CdkMenuItemCheckbox.decorators = [
    { type: Directive, args: [{
                selector: '[cdkMenuItemCheckbox]',
                exportAs: 'cdkMenuItemCheckbox',
                host: {
                    '[tabindex]': '_tabindex',
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
        if (target.classList.contains('cdk-menu') && !target.classList.contains('cdk-menu-inline')) {
            return true;
        }
        target = target.parentElement;
    }
    return false;
}
/** Tracks the last open context menu trigger across the entire application. */
class ContextMenuTracker {
    /**
     * Close the previous open context menu and set the given one as being open.
     * @param trigger the trigger for the currently open Context Menu.
     */
    update(trigger) {
        var _a;
        if (ContextMenuTracker._openContextMenuTrigger !== trigger) {
            (_a = ContextMenuTracker._openContextMenuTrigger) === null || _a === void 0 ? void 0 : _a.close();
            ContextMenuTracker._openContextMenuTrigger = trigger;
        }
    }
}
ContextMenuTracker.ɵprov = ɵɵdefineInjectable({ factory: function ContextMenuTracker_Factory() { return new ContextMenuTracker(); }, token: ContextMenuTracker, providedIn: "root" });
ContextMenuTracker.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** Injection token for the ContextMenu options object. */
const CDK_CONTEXT_MENU_DEFAULT_OPTIONS = new InjectionToken('cdk-context-menu-default-options');
const ɵ0 = { offsetX: 2, offsetY: 2 };
/**
 * A directive which when placed on some element opens a the Menu it is bound to when a user
 * right-clicks within that element. It is aware of nested Context Menus and the lowest level
 * non-disabled context menu will trigger.
 */
class CdkContextMenuTrigger {
    constructor(_viewContainerRef, _overlay, _contextMenuTracker, _options, document, _directionality) {
        this._viewContainerRef = _viewContainerRef;
        this._overlay = _overlay;
        this._contextMenuTracker = _contextMenuTracker;
        this._options = _options;
        this._directionality = _directionality;
        /** Emits when the attached menu is requested to open. */
        this.opened = new EventEmitter();
        /** Emits when the attached menu is requested to close. */
        this.closed = new EventEmitter();
        this._disabled = false;
        /** A reference to the overlay which manages the triggered menu. */
        this._overlayRef = null;
        /** Emits when the element is destroyed. */
        this._destroyed = new Subject();
        /** Emits when the document listener should stop. */
        this._stopDocumentListener = merge(this.closed, this._destroyed);
        /** The menu stack for this trigger and its associated menus. */
        this._menuStack = new MenuStack();
        this._document = document;
        this._setMenuStackListener();
    }
    /** Template reference variable to the menu to open on right click. */
    get menuPanel() {
        return this._menuPanel;
    }
    set menuPanel(panel) {
        // If the provided panel already has a stack, that means it already has a trigger configured
        // TODO refactor once https://github.com/angular/components/pull/20146 lands
        if (isDevMode() && panel._menuStack) {
            throwExistingMenuStackError();
        }
        this._menuPanel = panel;
        if (this._menuPanel) {
            this._menuPanel._menuStack = this._menuStack;
        }
    }
    /** Whether the context menu should be disabled. */
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    /**
     * Open the attached menu at the specified location.
     * @param coordinates where to open the context menu
     */
    open(coordinates) {
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
    }
    /** Close the opened menu. */
    close() {
        this._menuStack.closeAll();
    }
    /**
     * Open the context menu and close any previously open menus.
     * @param event the mouse event which opens the context menu.
     */
    _openOnContextMenu(event) {
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
    }
    /** Whether the attached menu is open. */
    isOpen() {
        var _a;
        return !!((_a = this._overlayRef) === null || _a === void 0 ? void 0 : _a.hasAttached());
    }
    /**
     * Get the configuration object used to create the overlay.
     * @param coordinates the location to place the opened menu
     */
    _getOverlayConfig(coordinates) {
        return new OverlayConfig({
            positionStrategy: this._getOverlayPositionStrategy(coordinates),
            scrollStrategy: this._overlay.scrollStrategies.block(),
            direction: this._directionality,
        });
    }
    /**
     * Build the position strategy for the overlay which specifies where to place the menu.
     * @param coordinates the location to place the opened menu
     */
    _getOverlayPositionStrategy(coordinates) {
        return this._overlay
            .position()
            .flexibleConnectedTo(coordinates)
            .withDefaultOffsetX(this._options.offsetX)
            .withDefaultOffsetY(this._options.offsetY)
            .withPositions(this._getOverlayPositions());
    }
    /**
     * Determine and return where to position the opened menu relative to the mouse location.
     */
    _getOverlayPositions() {
        // TODO: this should be configurable through the injected context menu options
        return [
            { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'top' },
            { originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'top' },
            { originX: 'end', originY: 'bottom', overlayX: 'start', overlayY: 'bottom' },
            { originX: 'start', originY: 'bottom', overlayX: 'end', overlayY: 'bottom' },
        ];
    }
    /**
     * Get the portal to be attached to the overlay which contains the menu. Allows for the menu
     * content to change dynamically and be reflected in the application.
     */
    _getMenuContent() {
        var _a;
        const hasMenuContentChanged = this.menuPanel._templateRef !== ((_a = this._panelContent) === null || _a === void 0 ? void 0 : _a.templateRef);
        if (this.menuPanel && (!this._panelContent || hasMenuContentChanged)) {
            this._panelContent = new TemplatePortal(this.menuPanel._templateRef, this._viewContainerRef);
        }
        return this._panelContent;
    }
    /**
     * Subscribe to the document click and context menu events and close out the menu when emitted.
     */
    _setCloseListener() {
        merge(fromEvent(this._document, 'click'), fromEvent(this._document, 'contextmenu'))
            .pipe(takeUntil(this._stopDocumentListener))
            .subscribe(event => {
            const target = event.composedPath ? event.composedPath()[0] : event.target;
            // stop the default context menu from appearing if user right-clicked somewhere outside of
            // any context menu directive or if a user right-clicked inside of the opened menu and just
            // close it.
            if (event.type === 'contextmenu') {
                if (target instanceof Element && isWithinMenuElement(target)) {
                    // Prevent the native context menu from opening within any open context menu or submenu
                    event.preventDefault();
                }
                else {
                    this.close();
                }
            }
            else {
                if (target instanceof Element && !isWithinMenuElement(target)) {
                    this.close();
                }
            }
        });
    }
    /** Subscribe to the menu stack close events and close this menu when requested. */
    _setMenuStackListener() {
        this._menuStack.closed.pipe(takeUntil(this._destroyed)).subscribe((item) => {
            if (item === this._menuPanel._menu && this.isOpen()) {
                this.closed.next();
                this._overlayRef.detach();
            }
        });
    }
    ngOnDestroy() {
        this._destroyOverlay();
        this._resetPanelMenuStack();
        this._destroyed.next();
        this._destroyed.complete();
    }
    /** Destroy and unset the overlay reference it if exists. */
    _destroyOverlay() {
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._overlayRef = null;
        }
    }
    /** Set the menu panels menu stack back to null. */
    _resetPanelMenuStack() {
        // If a ContextMenuTrigger is placed in a conditionally rendered view, each time the trigger is
        // rendered the panel setter for ContextMenuTrigger is called. From the first render onward,
        // the attached CdkMenuPanel has the MenuStack set. Since we throw an error if a panel already
        // has a stack set, we want to reset the attached stack here to prevent the error from being
        // thrown if the trigger re-configures its attached panel (in the case where there is a 1:1
        // relationship between the panel and trigger).
        if (this._menuPanel) {
            this._menuPanel._menuStack = null;
        }
    }
}
CdkContextMenuTrigger.decorators = [
    { type: Directive, args: [{
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
CdkContextMenuTrigger.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: Overlay },
    { type: ContextMenuTracker },
    { type: undefined, decorators: [{ type: Inject, args: [CDK_CONTEXT_MENU_DEFAULT_OPTIONS,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: Directionality, decorators: [{ type: Optional }] }
];
CdkContextMenuTrigger.propDecorators = {
    menuPanel: [{ type: Input, args: ['cdkContextMenuTriggerFor',] }],
    opened: [{ type: Output, args: ['cdkContextMenuOpened',] }],
    closed: [{ type: Output, args: ['cdkContextMenuClosed',] }],
    disabled: [{ type: Input, args: ['cdkContextMenuDisabled',] }]
};

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const EXPORTED_DECLARATIONS = [
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
class CdkMenuModule {
}
CdkMenuModule.decorators = [
    { type: NgModule, args: [{
                imports: [OverlayModule],
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

export { CDK_CONTEXT_MENU_DEFAULT_OPTIONS, CDK_MENU, CdkContextMenuTrigger, CdkMenu, CdkMenuBar, CdkMenuGroup, CdkMenuItem, CdkMenuItemCheckbox, CdkMenuItemRadio, CdkMenuItemTrigger, CdkMenuModule, CdkMenuPanel, ContextMenuTracker, MenuStack, ɵ0, CdkMenuItemSelectable as ɵangular_material_src_cdk_experimental_menu_menu_b };
//# sourceMappingURL=menu.js.map
