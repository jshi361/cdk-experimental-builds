import { Directive, TemplateRef, InjectionToken, EventEmitter, ElementRef, ViewContainerRef, Inject, Input, Output, Self, Optional, ContentChildren, NgModule } from '@angular/core';
import { OverlayConfig, Overlay, OverlayModule } from '@angular/cdk/overlay';
import { takeUntil, take } from 'rxjs/operators';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directionality } from '@angular/cdk/bidi';
import { TemplatePortal } from '@angular/cdk/portal';

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
let CdkMenuPanel = /** @class */ (() => {
    class CdkMenuPanel {
        constructor(_templateRef) {
            this._templateRef = _templateRef;
        }
        /**
         * Set the Menu component on the menu panel. Since we cannot use ContentChild to fetch the
         * child Menu component, the child Menu must register its self with the parent MenuPanel.
         */
        _registerMenu(child) {
            this._menu = child;
        }
    }
    CdkMenuPanel.decorators = [
        { type: Directive, args: [{ selector: 'ng-template[cdkMenuPanel]', exportAs: 'cdkMenuPanel' },] }
    ];
    CdkMenuPanel.ctorParameters = () => [
        { type: TemplateRef }
    ];
    return CdkMenuPanel;
})();

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
 * A directive to be combined with CdkMenuItem which opens the Menu it is bound to. If the
 * element is in a top level MenuBar it will open the menu on click, or if a sibling is already
 * opened it will open on hover. If it is inside of a Menu it will open the attached Submenu on
 * hover regardless of its sibling state.
 *
 * The directive must be placed along with the `cdkMenuItem` directive in order to enable full
 * functionality.
 */
let CdkMenuItemTrigger = /** @class */ (() => {
    class CdkMenuItemTrigger {
        constructor(_elementRef, _viewContainerRef, _overlay, _directionality, _parentMenu) {
            this._elementRef = _elementRef;
            this._viewContainerRef = _viewContainerRef;
            this._overlay = _overlay;
            this._directionality = _directionality;
            this._parentMenu = _parentMenu;
            /** Emits when the attached menu is requested to open */
            this.opened = new EventEmitter();
            /** Emits when the attached menu is requested to close */
            this.closed = new EventEmitter();
            /** A reference to the overlay which manages the triggered menu */
            this._overlayRef = null;
        }
        /** Open/close the attached menu if the trigger has been configured with one */
        toggle() {
            if (this.hasMenu()) {
                this.isMenuOpen() ? this._closeMenu() : this._openMenu();
            }
        }
        /** Return true if the trigger has an attached menu */
        hasMenu() {
            return !!this._menuPanel;
        }
        /** Whether the menu this button is a trigger for is open */
        isMenuOpen() {
            return this._overlayRef ? this._overlayRef.hasAttached() : false;
        }
        /** Open the attached menu */
        _openMenu() {
            this.opened.next();
            this._overlayRef = this._overlay.create(this._getOverlayConfig());
            this._overlayRef.attach(this._getPortal());
        }
        /** Close the opened menu */
        _closeMenu() {
            if (this.isMenuOpen()) {
                this.closed.next();
                this._overlayRef.detach();
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
            var _a;
            if (!this._panelContent || this._panelContent.templateRef !== ((_a = this._menuPanel) === null || _a === void 0 ? void 0 : _a._templateRef)) {
                this._panelContent = new TemplatePortal(this._menuPanel._templateRef, this._viewContainerRef);
            }
            return this._panelContent;
        }
        ngOnDestroy() {
            this._destroyOverlay();
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
                    selector: '[cdkMenuItem][cdkMenuTriggerFor]',
                    exportAs: 'cdkMenuTriggerFor',
                    host: {
                        'aria-haspopup': 'menu',
                        '[attr.aria-expanded]': 'isMenuOpen()',
                    },
                },] }
    ];
    CdkMenuItemTrigger.ctorParameters = () => [
        { type: ElementRef },
        { type: ViewContainerRef },
        { type: Overlay },
        { type: Directionality },
        { type: undefined, decorators: [{ type: Inject, args: [CDK_MENU,] }] }
    ];
    CdkMenuItemTrigger.propDecorators = {
        _menuPanel: [{ type: Input, args: ['cdkMenuTriggerFor',] }],
        opened: [{ type: Output, args: ['cdkMenuOpened',] }],
        closed: [{ type: Output, args: ['cdkMenuClosed',] }]
    };
    return CdkMenuItemTrigger;
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Directive which provides the ability for an element to be focused and navigated to using the
 * keyboard when residing in a CdkMenu, CdkMenuBar, or CdkMenuGroup. It performs user defined
 * behavior when clicked.
 */
let CdkMenuItem = /** @class */ (() => {
    class CdkMenuItem {
        constructor(
        /** Reference to the CdkMenuItemTrigger directive if one is added to the same element */
        _menuTrigger) {
            this._menuTrigger = _menuTrigger;
            this._disabled = false;
        }
        /**  Whether the CdkMenuItem is disabled - defaults to false */
        get disabled() {
            return this._disabled;
        }
        set disabled(value) {
            this._disabled = coerceBooleanProperty(value);
        }
        /** Open the menu if one is attached */
        trigger() {
            if (!this.disabled && this.hasMenu()) {
                this._menuTrigger.toggle();
            }
        }
        /** Whether the menu item opens a menu. */
        hasMenu() {
            return !!this._menuTrigger && this._menuTrigger.hasMenu();
        }
    }
    CdkMenuItem.decorators = [
        { type: Directive, args: [{
                    selector: '[cdkMenuItem]',
                    exportAs: 'cdkMenuItem',
                    host: {
                        'type': 'button',
                        'role': 'menuitem',
                        '[attr.aria-disabled]': 'disabled || null',
                    },
                },] }
    ];
    CdkMenuItem.ctorParameters = () => [
        { type: CdkMenuItemTrigger, decorators: [{ type: Self }, { type: Optional }] }
    ];
    CdkMenuItem.propDecorators = {
        disabled: [{ type: Input }]
    };
    return CdkMenuItem;
})();

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
let CdkMenuItemSelectable = /** @class */ (() => {
    class CdkMenuItemSelectable extends CdkMenuItem {
        constructor() {
            super(...arguments);
            /** Event emitted when the selectable item is clicked */
            this.clicked = new EventEmitter();
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
                this.clicked.next(this);
            }
        }
    }
    CdkMenuItemSelectable.decorators = [
        { type: Directive }
    ];
    CdkMenuItemSelectable.propDecorators = {
        clicked: [{ type: Output }],
        checked: [{ type: Input }],
        name: [{ type: Input }],
        id: [{ type: Input }]
    };
    return CdkMenuItemSelectable;
})();

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
let CdkMenuGroup = /** @class */ (() => {
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
            selectable.clicked
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
                    },
                    providers: [{ provide: UniqueSelectionDispatcher, useClass: UniqueSelectionDispatcher }],
                },] }
    ];
    CdkMenuGroup.propDecorators = {
        change: [{ type: Output }],
        _selectableItems: [{ type: ContentChildren, args: [CdkMenuItemSelectable, { descendants: true },] }]
    };
    return CdkMenuGroup;
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Throws an exception when the CdkMenuPanel cannot be injected and the developer did not
 * explicitly provide a reference to the enclosing CdkMenuPanel.
 * @docs-private
 */
function throwMissingMenuPanelError() {
    throw Error('CdkMenu must be placed inside a CdkMenuPanel or a reference to CdkMenuPanel' +
        ' must be explicitly provided if using ViewEngine');
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
let CdkMenu = /** @class */ (() => {
    class CdkMenu extends CdkMenuGroup {
        constructor(_menuPanel) {
            super();
            this._menuPanel = _menuPanel;
            /**
             * Sets the aria-orientation attribute and determines where menus will be opened.
             * Does not affect styling/layout.
             */
            this.orientation = 'vertical';
            /** Event emitted when the menu is closed. */
            this.closed = new EventEmitter();
        }
        ngAfterContentInit() {
            super.ngAfterContentInit();
            this._completeChangeEmitter();
            this._registerWithParentPanel();
        }
        /** Register this menu with its enclosing parent menu panel */
        _registerWithParentPanel() {
            const parent = this._getMenuPanel();
            if (parent) {
                parent._registerMenu(this);
            }
            else {
                throwMissingMenuPanelError();
            }
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
                        'role': 'menu',
                        '[attr.aria-orientation]': 'orientation',
                    },
                    providers: [
                        { provide: CdkMenuGroup, useExisting: CdkMenu },
                        { provide: CDK_MENU, useExisting: CdkMenu },
                    ],
                },] }
    ];
    CdkMenu.ctorParameters = () => [
        { type: CdkMenuPanel, decorators: [{ type: Optional }] }
    ];
    CdkMenu.propDecorators = {
        orientation: [{ type: Input, args: ['cdkMenuOrientation',] }],
        closed: [{ type: Output }],
        _nestedGroups: [{ type: ContentChildren, args: [CdkMenuGroup, { descendants: true },] }],
        _explicitPanel: [{ type: Input, args: ['cdkMenuPanel',] }]
    };
    return CdkMenu;
})();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Directive applied to an element which configures it as a MenuBar by setting the appropriate
 * role, aria attributes, and accessible keyboard and mouse handling logic. The component that
 * this directive is applied to should contain components marked with CdkMenuItem.
 *
 */
let CdkMenuBar = /** @class */ (() => {
    class CdkMenuBar extends CdkMenuGroup {
        constructor() {
            super(...arguments);
            /**
             * Sets the aria-orientation attribute and determines where menus will be opened.
             * Does not affect styling/layout.
             */
            this.orientation = 'horizontal';
        }
    }
    CdkMenuBar.decorators = [
        { type: Directive, args: [{
                    selector: '[cdkMenuBar]',
                    exportAs: 'cdkMenuBar',
                    host: {
                        'role': 'menubar',
                        '[attr.aria-orientation]': 'orientation',
                    },
                    providers: [
                        { provide: CdkMenuGroup, useExisting: CdkMenuBar },
                        { provide: CDK_MENU, useExisting: CdkMenuBar },
                    ],
                },] }
    ];
    CdkMenuBar.propDecorators = {
        orientation: [{ type: Input, args: ['cdkMenuBarOrientation',] }]
    };
    return CdkMenuBar;
})();

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
let CdkMenuItemRadio = /** @class */ (() => {
    class CdkMenuItemRadio extends CdkMenuItemSelectable {
        constructor(_selectionDispatcher) {
            super();
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
            this._removeDispatcherListener();
        }
    }
    CdkMenuItemRadio.decorators = [
        { type: Directive, args: [{
                    selector: '[cdkMenuItemRadio]',
                    exportAs: 'cdkMenuItemRadio',
                    host: {
                        '(click)': 'trigger()',
                        'type': 'button',
                        'role': 'menuitemradio',
                        '[attr.aria-checked]': 'checked || null',
                        '[attr.aria-disabled]': 'disabled || null',
                    },
                    providers: [{ provide: CdkMenuItemSelectable, useExisting: CdkMenuItemRadio }],
                },] }
    ];
    CdkMenuItemRadio.ctorParameters = () => [
        { type: UniqueSelectionDispatcher }
    ];
    return CdkMenuItemRadio;
})();

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
let CdkMenuItemCheckbox = /** @class */ (() => {
    class CdkMenuItemCheckbox extends CdkMenuItemSelectable {
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
                        '(click)': 'trigger()',
                        'type': 'button',
                        'role': 'menuitemcheckbox',
                        '[attr.aria-checked]': 'checked || null',
                        '[attr.aria-disabled]': 'disabled || null',
                    },
                    providers: [{ provide: CdkMenuItemSelectable, useExisting: CdkMenuItemCheckbox }],
                },] }
    ];
    return CdkMenuItemCheckbox;
})();

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
];
let CdkMenuModule = /** @class */ (() => {
    class CdkMenuModule {
    }
    CdkMenuModule.decorators = [
        { type: NgModule, args: [{
                    imports: [OverlayModule],
                    exports: EXPORTED_DECLARATIONS,
                    declarations: EXPORTED_DECLARATIONS,
                },] }
    ];
    return CdkMenuModule;
})();

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

export { CdkMenu, CdkMenuBar, CdkMenuGroup, CdkMenuItem, CdkMenuItemCheckbox, CdkMenuItemRadio, CdkMenuItemTrigger, CdkMenuModule, CdkMenuPanel, CdkMenuItemSelectable as ɵangular_material_src_cdk_experimental_menu_menu_a, CDK_MENU as ɵangular_material_src_cdk_experimental_menu_menu_b };
//# sourceMappingURL=menu.js.map
