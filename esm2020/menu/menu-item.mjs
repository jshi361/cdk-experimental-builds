/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, Input, Optional, Self, ElementRef, Output, EventEmitter, Inject, HostListener, NgZone, } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SPACE, ENTER, RIGHT_ARROW, LEFT_ARROW } from '@angular/cdk/keycodes';
import { Directionality } from '@angular/cdk/bidi';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { CdkMenuItemTrigger } from './menu-item-trigger';
import { CDK_MENU } from './menu-interface';
import { MENU_AIM } from './menu-aim';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/bidi";
import * as i2 from "./menu-item-trigger";
// TODO refactor this to be configurable allowing for custom elements to be removed
/** Removes all icons from within the given element. */
function removeIcons(element) {
    for (const icon of Array.from(element.querySelectorAll('mat-icon, .material-icons'))) {
        icon.remove();
    }
}
/**
 * Directive which provides the ability for an element to be focused and navigated to using the
 * keyboard when residing in a CdkMenu, CdkMenuBar, or CdkMenuGroup. It performs user defined
 * behavior when clicked.
 */
export class CdkMenuItem {
    constructor(_elementRef, _ngZone, _parentMenu, _menuAim, _dir, 
    /** Reference to the CdkMenuItemTrigger directive if one is added to the same element */
    // `CdkMenuItem` is commonly used in combination with a `CdkMenuItemTrigger`.
    // tslint:disable-next-line: lightweight-tokens
    _menuTrigger) {
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
        this._parentMenu = _parentMenu;
        this._menuAim = _menuAim;
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
        if (this._isStandaloneItem()) {
            this._tabindex = 0;
        }
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
        if (!this._isStandaloneItem()) {
            this._tabindex = -1;
        }
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
        if (this.disabled) {
            return;
        }
        // don't set the tabindex if there are no open sibling or parent menus
        if (!event || !this._getMenuStack()?.isEmpty()) {
            this._tabindex = 0;
        }
    }
    /** Whether this menu item is standalone or within a menu or menu bar. */
    _isStandaloneItem() {
        return !this._parentMenu;
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
        if (!this.disabled && !this.hasMenu()) {
            this.triggered.next();
            this._getMenuStack()?.closeAll();
        }
    }
    /** Whether the menu item opens a menu. */
    hasMenu() {
        return !!this._menuTrigger?.hasMenu();
    }
    /** Return true if this MenuItem has an attached menu and it is open. */
    isMenuOpen() {
        return !!this._menuTrigger?.isMenuOpen();
    }
    /**
     * Get a reference to the rendered Menu if the Menu is open and it is visible in the DOM.
     * @return the menu if it is open, otherwise undefined.
     */
    getMenu() {
        return this._menuTrigger?.getMenu();
    }
    /** Get the MenuItemTrigger associated with this element. */
    getMenuTrigger() {
        return this._menuTrigger;
    }
    /** Get the label for this element which is required by the FocusableOption interface. */
    getLabel() {
        // TODO cloning the tree may be expensive; implement a better method
        // we know that the current node is an element type
        const clone = this._elementRef.nativeElement.cloneNode(true);
        removeIcons(clone);
        return clone.textContent?.trim() || '';
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
        switch (event.keyCode) {
            case SPACE:
            case ENTER:
                event.preventDefault();
                this.trigger();
                break;
            case RIGHT_ARROW:
                if (this._parentMenu && this._isParentVertical() && !this.hasMenu()) {
                    event.preventDefault();
                    this._dir?.value === 'rtl'
                        ? this._getMenuStack()?.close(this._parentMenu, 1 /* previousItem */)
                        : this._getMenuStack()?.closeAll(0 /* nextItem */);
                }
                break;
            case LEFT_ARROW:
                if (this._parentMenu && this._isParentVertical() && !this.hasMenu()) {
                    event.preventDefault();
                    this._dir?.value === 'rtl'
                        ? this._getMenuStack()?.closeAll(0 /* nextItem */)
                        : this._getMenuStack()?.close(this._parentMenu, 1 /* previousItem */);
                }
                break;
        }
    }
    /**
     * Subscribe to the mouseenter events and close any sibling menu items if this element is moused
     * into.
     */
    _setupMouseEnter() {
        if (!this._isStandaloneItem()) {
            const closeOpenSiblings = () => this._ngZone.run(() => this._getMenuStack()?.closeSubMenuOf(this._parentMenu));
            this._ngZone.runOutsideAngular(() => fromEvent(this._elementRef.nativeElement, 'mouseenter')
                .pipe(filter(() => !this._getMenuStack()?.isEmpty() && !this.hasMenu()), takeUntil(this._destroyed))
                .subscribe(() => {
                if (this._menuAim) {
                    this._menuAim.toggle(closeOpenSiblings);
                }
                else {
                    closeOpenSiblings();
                }
            }));
        }
    }
    /**
     * Return true if the enclosing parent menu is configured in a horizontal orientation, false
     * otherwise or if no parent.
     */
    _isParentVertical() {
        return this._parentMenu?.orientation === 'vertical';
    }
    /** Get the MenuStack from the parent menu. */
    _getMenuStack() {
        // We use a function since at the construction of the MenuItemTrigger the parent Menu won't have
        // its menu stack set. Therefore we need to reference the menu stack from the parent each time
        // we want to use it.
        return this._parentMenu?._menuStack;
    }
    ngOnDestroy() {
        this._destroyed.next();
    }
}
CdkMenuItem.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: CdkMenuItem, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }, { token: CDK_MENU, optional: true }, { token: MENU_AIM, optional: true }, { token: i1.Directionality, optional: true }, { token: i2.CdkMenuItemTrigger, optional: true, self: true }], target: i0.ɵɵFactoryTarget.Directive });
CdkMenuItem.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0-rc.3", type: CdkMenuItem, selector: "[cdkMenuItem]", inputs: { disabled: "disabled" }, outputs: { triggered: "cdkMenuItemTriggered" }, host: { attributes: { "type": "button", "role": "menuitem" }, listeners: { "blur": "_resetTabIndex()", "mouseout": "_resetTabIndex()", "focus": "_setTabIndex()", "mouseenter": "_setTabIndex($event)", "click": "trigger()", "keydown": "_onKeydown($event)" }, properties: { "tabindex": "_tabindex", "attr.aria-disabled": "disabled || null" }, classAttribute: "cdk-menu-item" }, exportAs: ["cdkMenuItem"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: CdkMenuItem, decorators: [{
            type: Directive,
            args: [{
                    selector: '[cdkMenuItem]',
                    exportAs: 'cdkMenuItem',
                    host: {
                        '[tabindex]': '_tabindex',
                        'type': 'button',
                        'role': 'menuitem',
                        'class': 'cdk-menu-item',
                        '[attr.aria-disabled]': 'disabled || null',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.NgZone }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [CDK_MENU]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MENU_AIM]
                }] }, { type: i1.Directionality, decorators: [{
                    type: Optional
                }] }, { type: i2.CdkMenuItemTrigger, decorators: [{
                    type: Self
                }, {
                    type: Optional
                }] }]; }, propDecorators: { disabled: [{
                type: Input
            }], triggered: [{
                type: Output,
                args: ['cdkMenuItemTriggered']
            }], 
        /** Reset the _tabindex to -1. */
        _resetTabIndex: [{
                type: HostListener,
                args: ['blur']
            }, {
                type: HostListener,
                args: ['mouseout']
            }], 
        /**
         * Set the tab index to 0 if not disabled and it's a focus event, or a mouse enter if this element
         * is not in a menu bar.
         */
        _setTabIndex: [{
                type: HostListener,
                args: ['focus']
            }, {
                type: HostListener,
                args: ['mouseenter', ['$event']]
            }], 
        /**
         * If the menu item is not disabled and the element does not have a menu trigger attached, emit
         * on the cdkMenuItemTriggered emitter and close all open menus.
         */
        trigger: [{
                type: HostListener,
                args: ['click']
            }], 
        /**
         * Handles keyboard events for the menu item, specifically either triggering the user defined
         * callback or opening/closing the current menu based on whether the left or right arrow key was
         * pressed.
         * @param event the keyboard event to handle
         */
        _onKeydown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1pdGVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2Nkay1leHBlcmltZW50YWwvbWVudS9tZW51LWl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsUUFBUSxFQUNSLElBQUksRUFDSixVQUFVLEVBQ1YsTUFBTSxFQUNOLFlBQVksRUFDWixNQUFNLEVBQ04sWUFBWSxFQUNaLE1BQU0sR0FFUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMscUJBQXFCLEVBQWUsTUFBTSx1QkFBdUIsQ0FBQztBQUUxRSxPQUFPLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDNUUsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxPQUFPLEVBQUUsU0FBUyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3hDLE9BQU8sRUFBQyxTQUFTLEVBQUUsTUFBTSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFPLFFBQVEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBR2hELE9BQU8sRUFBVSxRQUFRLEVBQVUsTUFBTSxZQUFZLENBQUM7Ozs7QUFFdEQsbUZBQW1GO0FBQ25GLHVEQUF1RDtBQUN2RCxTQUFTLFdBQVcsQ0FBQyxPQUFnQjtJQUNuQyxLQUFLLE1BQU0sSUFBSSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLDJCQUEyQixDQUFDLENBQUMsRUFBRTtRQUNwRixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDZjtBQUNILENBQUM7QUFFRDs7OztHQUlHO0FBWUgsTUFBTSxP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c0JBQ3BCLFlBQVk7dUJBQUMsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDOztRQTBCdEM7OztXQUdHO1FBQ0gsT0FBTztzQkFMTixZQUFZO3VCQUFDLE9BQU87O1FBa0RyQjs7Ozs7V0FLRztRQUNILFVBQVU7c0JBUFQsWUFBWTt1QkFBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBJbnB1dCxcbiAgT3B0aW9uYWwsXG4gIFNlbGYsXG4gIEVsZW1lbnRSZWYsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIEhvc3RMaXN0ZW5lcixcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtjb2VyY2VCb29sZWFuUHJvcGVydHksIEJvb2xlYW5JbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7Rm9jdXNhYmxlT3B0aW9ufSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQge1NQQUNFLCBFTlRFUiwgUklHSFRfQVJST1csIExFRlRfQVJST1d9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQge0RpcmVjdGlvbmFsaXR5fSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge1N1YmplY3QsIGZyb21FdmVudH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge3Rha2VVbnRpbCwgZmlsdGVyfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge0Nka01lbnVJdGVtVHJpZ2dlcn0gZnJvbSAnLi9tZW51LWl0ZW0tdHJpZ2dlcic7XG5pbXBvcnQge01lbnUsIENES19NRU5VfSBmcm9tICcuL21lbnUtaW50ZXJmYWNlJztcbmltcG9ydCB7Rm9jdXNOZXh0fSBmcm9tICcuL21lbnUtc3RhY2snO1xuaW1wb3J0IHtGb2N1c2FibGVFbGVtZW50fSBmcm9tICcuL3BvaW50ZXItZm9jdXMtdHJhY2tlcic7XG5pbXBvcnQge1RvZ2dsZXIsIE1FTlVfQUlNLCBNZW51QWltfSBmcm9tICcuL21lbnUtYWltJztcblxuLy8gVE9ETyByZWZhY3RvciB0aGlzIHRvIGJlIGNvbmZpZ3VyYWJsZSBhbGxvd2luZyBmb3IgY3VzdG9tIGVsZW1lbnRzIHRvIGJlIHJlbW92ZWRcbi8qKiBSZW1vdmVzIGFsbCBpY29ucyBmcm9tIHdpdGhpbiB0aGUgZ2l2ZW4gZWxlbWVudC4gKi9cbmZ1bmN0aW9uIHJlbW92ZUljb25zKGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgZm9yIChjb25zdCBpY29uIG9mIEFycmF5LmZyb20oZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdtYXQtaWNvbiwgLm1hdGVyaWFsLWljb25zJykpKSB7XG4gICAgaWNvbi5yZW1vdmUoKTtcbiAgfVxufVxuXG4vKipcbiAqIERpcmVjdGl2ZSB3aGljaCBwcm92aWRlcyB0aGUgYWJpbGl0eSBmb3IgYW4gZWxlbWVudCB0byBiZSBmb2N1c2VkIGFuZCBuYXZpZ2F0ZWQgdG8gdXNpbmcgdGhlXG4gKiBrZXlib2FyZCB3aGVuIHJlc2lkaW5nIGluIGEgQ2RrTWVudSwgQ2RrTWVudUJhciwgb3IgQ2RrTWVudUdyb3VwLiBJdCBwZXJmb3JtcyB1c2VyIGRlZmluZWRcbiAqIGJlaGF2aW9yIHdoZW4gY2xpY2tlZC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2Nka01lbnVJdGVtXScsXG4gIGV4cG9ydEFzOiAnY2RrTWVudUl0ZW0nLFxuICBob3N0OiB7XG4gICAgJ1t0YWJpbmRleF0nOiAnX3RhYmluZGV4JyxcbiAgICAndHlwZSc6ICdidXR0b24nLFxuICAgICdyb2xlJzogJ21lbnVpdGVtJyxcbiAgICAnY2xhc3MnOiAnY2RrLW1lbnUtaXRlbScsXG4gICAgJ1thdHRyLmFyaWEtZGlzYWJsZWRdJzogJ2Rpc2FibGVkIHx8IG51bGwnLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBDZGtNZW51SXRlbSBpbXBsZW1lbnRzIEZvY3VzYWJsZU9wdGlvbiwgRm9jdXNhYmxlRWxlbWVudCwgVG9nZ2xlciwgT25EZXN0cm95IHtcbiAgLyoqICBXaGV0aGVyIHRoZSBDZGtNZW51SXRlbSBpcyBkaXNhYmxlZCAtIGRlZmF1bHRzIHRvIGZhbHNlICovXG4gIEBJbnB1dCgpXG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX2Rpc2FibGVkID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIElmIHRoaXMgTWVudUl0ZW0gaXMgYSByZWd1bGFyIE1lbnVJdGVtLCBvdXRwdXRzIHdoZW4gaXQgaXMgdHJpZ2dlcmVkIGJ5IGEga2V5Ym9hcmQgb3IgbW91c2VcbiAgICogZXZlbnQuXG4gICAqL1xuICBAT3V0cHV0KCdjZGtNZW51SXRlbVRyaWdnZXJlZCcpIHJlYWRvbmx5IHRyaWdnZXJlZDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBUaGUgdGFiaW5kZXggZm9yIHRoaXMgbWVudSBpdGVtIG1hbmFnZWQgaW50ZXJuYWxseSBhbmQgdXNlZCBmb3IgaW1wbGVtZW50aW5nIHJvdmluZyBhXG4gICAqIHRhYiBpbmRleC5cbiAgICovXG4gIF90YWJpbmRleDogMCB8IC0xID0gLTE7XG5cbiAgLyoqIEVtaXRzIHdoZW4gdGhlIG1lbnUgaXRlbSBpcyBkZXN0cm95ZWQuICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX2Rlc3Ryb3llZCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcmVhZG9ubHkgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIHByaXZhdGUgcmVhZG9ubHkgX25nWm9uZTogTmdab25lLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQ0RLX01FTlUpIHByaXZhdGUgcmVhZG9ubHkgX3BhcmVudE1lbnU/OiBNZW51LFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUVOVV9BSU0pIHByaXZhdGUgcmVhZG9ubHkgX21lbnVBaW0/OiBNZW51QWltLFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgcmVhZG9ubHkgX2Rpcj86IERpcmVjdGlvbmFsaXR5LFxuICAgIC8qKiBSZWZlcmVuY2UgdG8gdGhlIENka01lbnVJdGVtVHJpZ2dlciBkaXJlY3RpdmUgaWYgb25lIGlzIGFkZGVkIHRvIHRoZSBzYW1lIGVsZW1lbnQgKi9cbiAgICAvLyBgQ2RrTWVudUl0ZW1gIGlzIGNvbW1vbmx5IHVzZWQgaW4gY29tYmluYXRpb24gd2l0aCBhIGBDZGtNZW51SXRlbVRyaWdnZXJgLlxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbGlnaHR3ZWlnaHQtdG9rZW5zXG4gICAgQFNlbGYoKSBAT3B0aW9uYWwoKSBwcml2YXRlIHJlYWRvbmx5IF9tZW51VHJpZ2dlcj86IENka01lbnVJdGVtVHJpZ2dlcixcbiAgKSB7XG4gICAgdGhpcy5fc2V0dXBNb3VzZUVudGVyKCk7XG5cbiAgICBpZiAodGhpcy5faXNTdGFuZGFsb25lSXRlbSgpKSB7XG4gICAgICB0aGlzLl90YWJpbmRleCA9IDA7XG4gICAgfVxuICB9XG5cbiAgLyoqIFBsYWNlIGZvY3VzIG9uIHRoZSBlbGVtZW50LiAqL1xuICBmb2N1cygpIHtcbiAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIC8vIEluIEl2eSB0aGUgYGhvc3RgIG1ldGFkYXRhIHdpbGwgYmUgbWVyZ2VkLCB3aGVyZWFzIGluIFZpZXdFbmdpbmUgaXQgaXMgb3ZlcnJpZGRlbi4gSW4gb3JkZXJcbiAgLy8gdG8gYXZvaWQgZG91YmxlIGV2ZW50IGxpc3RlbmVycywgd2UgbmVlZCB0byB1c2UgYEhvc3RMaXN0ZW5lcmAuIE9uY2UgSXZ5IGlzIHRoZSBkZWZhdWx0LCB3ZVxuICAvLyBjYW4gbW92ZSB0aGlzIGJhY2sgaW50byBgaG9zdGAuXG4gIC8vIHRzbGludDpkaXNhYmxlOm5vLWhvc3QtZGVjb3JhdG9yLWluLWNvbmNyZXRlXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInKVxuICBASG9zdExpc3RlbmVyKCdtb3VzZW91dCcpXG4gIC8qKiBSZXNldCB0aGUgX3RhYmluZGV4IHRvIC0xLiAqL1xuICBfcmVzZXRUYWJJbmRleCgpIHtcbiAgICBpZiAoIXRoaXMuX2lzU3RhbmRhbG9uZUl0ZW0oKSkge1xuICAgICAgdGhpcy5fdGFiaW5kZXggPSAtMTtcbiAgICB9XG4gIH1cblxuICAvLyBJbiBJdnkgdGhlIGBob3N0YCBtZXRhZGF0YSB3aWxsIGJlIG1lcmdlZCwgd2hlcmVhcyBpbiBWaWV3RW5naW5lIGl0IGlzIG92ZXJyaWRkZW4uIEluIG9yZGVyXG4gIC8vIHRvIGF2b2lkIGRvdWJsZSBldmVudCBsaXN0ZW5lcnMsIHdlIG5lZWQgdG8gdXNlIGBIb3N0TGlzdGVuZXJgLiBPbmNlIEl2eSBpcyB0aGUgZGVmYXVsdCwgd2VcbiAgLy8gY2FuIG1vdmUgdGhpcyBiYWNrIGludG8gYGhvc3RgLlxuICAvLyB0c2xpbnQ6ZGlzYWJsZTpuby1ob3N0LWRlY29yYXRvci1pbi1jb25jcmV0ZVxuICBASG9zdExpc3RlbmVyKCdmb2N1cycpXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBbJyRldmVudCddKVxuICAvKipcbiAgICogU2V0IHRoZSB0YWIgaW5kZXggdG8gMCBpZiBub3QgZGlzYWJsZWQgYW5kIGl0J3MgYSBmb2N1cyBldmVudCwgb3IgYSBtb3VzZSBlbnRlciBpZiB0aGlzIGVsZW1lbnRcbiAgICogaXMgbm90IGluIGEgbWVudSBiYXIuXG4gICAqL1xuICBfc2V0VGFiSW5kZXgoZXZlbnQ/OiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBkb24ndCBzZXQgdGhlIHRhYmluZGV4IGlmIHRoZXJlIGFyZSBubyBvcGVuIHNpYmxpbmcgb3IgcGFyZW50IG1lbnVzXG4gICAgaWYgKCFldmVudCB8fCAhdGhpcy5fZ2V0TWVudVN0YWNrKCk/LmlzRW1wdHkoKSkge1xuICAgICAgdGhpcy5fdGFiaW5kZXggPSAwO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoaXMgbWVudSBpdGVtIGlzIHN0YW5kYWxvbmUgb3Igd2l0aGluIGEgbWVudSBvciBtZW51IGJhci4gKi9cbiAgX2lzU3RhbmRhbG9uZUl0ZW0oKSB7XG4gICAgcmV0dXJuICF0aGlzLl9wYXJlbnRNZW51O1xuICB9XG5cbiAgLy8gSW4gSXZ5IHRoZSBgaG9zdGAgbWV0YWRhdGEgd2lsbCBiZSBtZXJnZWQsIHdoZXJlYXMgaW4gVmlld0VuZ2luZSBpdCBpcyBvdmVycmlkZGVuLiBJbiBvcmRlclxuICAvLyB0byBhdm9pZCBkb3VibGUgZXZlbnQgbGlzdGVuZXJzLCB3ZSBuZWVkIHRvIHVzZSBgSG9zdExpc3RlbmVyYC4gT25jZSBJdnkgaXMgdGhlIGRlZmF1bHQsIHdlXG4gIC8vIGNhbiBtb3ZlIHRoaXMgYmFjayBpbnRvIGBob3N0YC5cbiAgLy8gdHNsaW50OmRpc2FibGU6bm8taG9zdC1kZWNvcmF0b3ItaW4tY29uY3JldGVcbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICAvKipcbiAgICogSWYgdGhlIG1lbnUgaXRlbSBpcyBub3QgZGlzYWJsZWQgYW5kIHRoZSBlbGVtZW50IGRvZXMgbm90IGhhdmUgYSBtZW51IHRyaWdnZXIgYXR0YWNoZWQsIGVtaXRcbiAgICogb24gdGhlIGNka01lbnVJdGVtVHJpZ2dlcmVkIGVtaXR0ZXIgYW5kIGNsb3NlIGFsbCBvcGVuIG1lbnVzLlxuICAgKi9cbiAgdHJpZ2dlcigpIHtcbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQgJiYgIXRoaXMuaGFzTWVudSgpKSB7XG4gICAgICB0aGlzLnRyaWdnZXJlZC5uZXh0KCk7XG4gICAgICB0aGlzLl9nZXRNZW51U3RhY2soKT8uY2xvc2VBbGwoKTtcbiAgICB9XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgbWVudSBpdGVtIG9wZW5zIGEgbWVudS4gKi9cbiAgaGFzTWVudSgpIHtcbiAgICByZXR1cm4gISF0aGlzLl9tZW51VHJpZ2dlcj8uaGFzTWVudSgpO1xuICB9XG5cbiAgLyoqIFJldHVybiB0cnVlIGlmIHRoaXMgTWVudUl0ZW0gaGFzIGFuIGF0dGFjaGVkIG1lbnUgYW5kIGl0IGlzIG9wZW4uICovXG4gIGlzTWVudU9wZW4oKSB7XG4gICAgcmV0dXJuICEhdGhpcy5fbWVudVRyaWdnZXI/LmlzTWVudU9wZW4oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSByZWZlcmVuY2UgdG8gdGhlIHJlbmRlcmVkIE1lbnUgaWYgdGhlIE1lbnUgaXMgb3BlbiBhbmQgaXQgaXMgdmlzaWJsZSBpbiB0aGUgRE9NLlxuICAgKiBAcmV0dXJuIHRoZSBtZW51IGlmIGl0IGlzIG9wZW4sIG90aGVyd2lzZSB1bmRlZmluZWQuXG4gICAqL1xuICBnZXRNZW51KCk6IE1lbnUgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9tZW51VHJpZ2dlcj8uZ2V0TWVudSgpO1xuICB9XG5cbiAgLyoqIEdldCB0aGUgTWVudUl0ZW1UcmlnZ2VyIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGVsZW1lbnQuICovXG4gIGdldE1lbnVUcmlnZ2VyKCk6IENka01lbnVJdGVtVHJpZ2dlciB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX21lbnVUcmlnZ2VyO1xuICB9XG5cbiAgLyoqIEdldCB0aGUgbGFiZWwgZm9yIHRoaXMgZWxlbWVudCB3aGljaCBpcyByZXF1aXJlZCBieSB0aGUgRm9jdXNhYmxlT3B0aW9uIGludGVyZmFjZS4gKi9cbiAgZ2V0TGFiZWwoKTogc3RyaW5nIHtcbiAgICAvLyBUT0RPIGNsb25pbmcgdGhlIHRyZWUgbWF5IGJlIGV4cGVuc2l2ZTsgaW1wbGVtZW50IGEgYmV0dGVyIG1ldGhvZFxuICAgIC8vIHdlIGtub3cgdGhhdCB0aGUgY3VycmVudCBub2RlIGlzIGFuIGVsZW1lbnQgdHlwZVxuICAgIGNvbnN0IGNsb25lID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsb25lTm9kZSh0cnVlKSBhcyBFbGVtZW50O1xuICAgIHJlbW92ZUljb25zKGNsb25lKTtcblxuICAgIHJldHVybiBjbG9uZS50ZXh0Q29udGVudD8udHJpbSgpIHx8ICcnO1xuICB9XG5cbiAgLy8gSW4gSXZ5IHRoZSBgaG9zdGAgbWV0YWRhdGEgd2lsbCBiZSBtZXJnZWQsIHdoZXJlYXMgaW4gVmlld0VuZ2luZSBpdCBpcyBvdmVycmlkZGVuLiBJbiBvcmRlclxuICAvLyB0byBhdm9pZCBkb3VibGUgZXZlbnQgbGlzdGVuZXJzLCB3ZSBuZWVkIHRvIHVzZSBgSG9zdExpc3RlbmVyYC4gT25jZSBJdnkgaXMgdGhlIGRlZmF1bHQsIHdlXG4gIC8vIGNhbiBtb3ZlIHRoaXMgYmFjayBpbnRvIGBob3N0YC5cbiAgLy8gdHNsaW50OmRpc2FibGU6bm8taG9zdC1kZWNvcmF0b3ItaW4tY29uY3JldGVcbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gIC8qKlxuICAgKiBIYW5kbGVzIGtleWJvYXJkIGV2ZW50cyBmb3IgdGhlIG1lbnUgaXRlbSwgc3BlY2lmaWNhbGx5IGVpdGhlciB0cmlnZ2VyaW5nIHRoZSB1c2VyIGRlZmluZWRcbiAgICogY2FsbGJhY2sgb3Igb3BlbmluZy9jbG9zaW5nIHRoZSBjdXJyZW50IG1lbnUgYmFzZWQgb24gd2hldGhlciB0aGUgbGVmdCBvciByaWdodCBhcnJvdyBrZXkgd2FzXG4gICAqIHByZXNzZWQuXG4gICAqIEBwYXJhbSBldmVudCB0aGUga2V5Ym9hcmQgZXZlbnQgdG8gaGFuZGxlXG4gICAqL1xuICBfb25LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICBjYXNlIFNQQUNFOlxuICAgICAgY2FzZSBFTlRFUjpcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy50cmlnZ2VyKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFJJR0hUX0FSUk9XOlxuICAgICAgICBpZiAodGhpcy5fcGFyZW50TWVudSAmJiB0aGlzLl9pc1BhcmVudFZlcnRpY2FsKCkgJiYgIXRoaXMuaGFzTWVudSgpKSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGlzLl9kaXI/LnZhbHVlID09PSAncnRsJ1xuICAgICAgICAgICAgPyB0aGlzLl9nZXRNZW51U3RhY2soKT8uY2xvc2UodGhpcy5fcGFyZW50TWVudSwgRm9jdXNOZXh0LnByZXZpb3VzSXRlbSlcbiAgICAgICAgICAgIDogdGhpcy5fZ2V0TWVudVN0YWNrKCk/LmNsb3NlQWxsKEZvY3VzTmV4dC5uZXh0SXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgTEVGVF9BUlJPVzpcbiAgICAgICAgaWYgKHRoaXMuX3BhcmVudE1lbnUgJiYgdGhpcy5faXNQYXJlbnRWZXJ0aWNhbCgpICYmICF0aGlzLmhhc01lbnUoKSkge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy5fZGlyPy52YWx1ZSA9PT0gJ3J0bCdcbiAgICAgICAgICAgID8gdGhpcy5fZ2V0TWVudVN0YWNrKCk/LmNsb3NlQWxsKEZvY3VzTmV4dC5uZXh0SXRlbSlcbiAgICAgICAgICAgIDogdGhpcy5fZ2V0TWVudVN0YWNrKCk/LmNsb3NlKHRoaXMuX3BhcmVudE1lbnUsIEZvY3VzTmV4dC5wcmV2aW91c0l0ZW0pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpYmUgdG8gdGhlIG1vdXNlZW50ZXIgZXZlbnRzIGFuZCBjbG9zZSBhbnkgc2libGluZyBtZW51IGl0ZW1zIGlmIHRoaXMgZWxlbWVudCBpcyBtb3VzZWRcbiAgICogaW50by5cbiAgICovXG4gIHByaXZhdGUgX3NldHVwTW91c2VFbnRlcigpIHtcbiAgICBpZiAoIXRoaXMuX2lzU3RhbmRhbG9uZUl0ZW0oKSkge1xuICAgICAgY29uc3QgY2xvc2VPcGVuU2libGluZ3MgPSAoKSA9PlxuICAgICAgICB0aGlzLl9uZ1pvbmUucnVuKCgpID0+IHRoaXMuX2dldE1lbnVTdGFjaygpPy5jbG9zZVN1Yk1lbnVPZih0aGlzLl9wYXJlbnRNZW51ISkpO1xuXG4gICAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT5cbiAgICAgICAgZnJvbUV2ZW50KHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ21vdXNlZW50ZXInKVxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgZmlsdGVyKCgpID0+ICF0aGlzLl9nZXRNZW51U3RhY2soKT8uaXNFbXB0eSgpICYmICF0aGlzLmhhc01lbnUoKSksXG4gICAgICAgICAgICB0YWtlVW50aWwodGhpcy5fZGVzdHJveWVkKSxcbiAgICAgICAgICApXG4gICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5fbWVudUFpbSkge1xuICAgICAgICAgICAgICB0aGlzLl9tZW51QWltLnRvZ2dsZShjbG9zZU9wZW5TaWJsaW5ncyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjbG9zZU9wZW5TaWJsaW5ncygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRydWUgaWYgdGhlIGVuY2xvc2luZyBwYXJlbnQgbWVudSBpcyBjb25maWd1cmVkIGluIGEgaG9yaXpvbnRhbCBvcmllbnRhdGlvbiwgZmFsc2VcbiAgICogb3RoZXJ3aXNlIG9yIGlmIG5vIHBhcmVudC5cbiAgICovXG4gIHByaXZhdGUgX2lzUGFyZW50VmVydGljYWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3BhcmVudE1lbnU/Lm9yaWVudGF0aW9uID09PSAndmVydGljYWwnO1xuICB9XG5cbiAgLyoqIEdldCB0aGUgTWVudVN0YWNrIGZyb20gdGhlIHBhcmVudCBtZW51LiAqL1xuICBwcml2YXRlIF9nZXRNZW51U3RhY2soKSB7XG4gICAgLy8gV2UgdXNlIGEgZnVuY3Rpb24gc2luY2UgYXQgdGhlIGNvbnN0cnVjdGlvbiBvZiB0aGUgTWVudUl0ZW1UcmlnZ2VyIHRoZSBwYXJlbnQgTWVudSB3b24ndCBoYXZlXG4gICAgLy8gaXRzIG1lbnUgc3RhY2sgc2V0LiBUaGVyZWZvcmUgd2UgbmVlZCB0byByZWZlcmVuY2UgdGhlIG1lbnUgc3RhY2sgZnJvbSB0aGUgcGFyZW50IGVhY2ggdGltZVxuICAgIC8vIHdlIHdhbnQgdG8gdXNlIGl0LlxuICAgIHJldHVybiB0aGlzLl9wYXJlbnRNZW51Py5fbWVudVN0YWNrO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fZGVzdHJveWVkLm5leHQoKTtcbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9kaXNhYmxlZDogQm9vbGVhbklucHV0O1xufVxuIl19