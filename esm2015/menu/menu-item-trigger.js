/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, Input, Output, EventEmitter, ElementRef, ViewContainerRef, Inject, Optional, } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { TemplatePortal } from '@angular/cdk/portal';
import { Overlay, OverlayConfig, } from '@angular/cdk/overlay';
import { SPACE, ENTER, RIGHT_ARROW, LEFT_ARROW, DOWN_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { CDK_MENU } from './menu-interface';
/**
 * A directive to be combined with CdkMenuItem which opens the Menu it is bound to. If the
 * element is in a top level MenuBar it will open the menu on click, or if a sibling is already
 * opened it will open on hover. If it is inside of a Menu it will open the attached Submenu on
 * hover regardless of its sibling state.
 *
 * The directive must be placed along with the `cdkMenuItem` directive in order to enable full
 * functionality.
 */
export class CdkMenuItemTrigger {
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
     * Handles keyboard events for the menu item, specifically opening/closing the attached menu and
     * focusing the appropriate submenu item.
     * @param event the keyboard event to handle
     */
    _toggleOnKeydown(event) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
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
                        this._getMenuStack().closeLatest(2 /* currentItem */);
                    }
                    else {
                        this.openMenu();
                        (_e = (_d = this.menuPanel) === null || _d === void 0 ? void 0 : _d._menu) === null || _e === void 0 ? void 0 : _e.focusFirstItem('keyboard');
                    }
                }
                break;
            case LEFT_ARROW:
                if (this._isParentVertical()) {
                    event.preventDefault();
                    if (((_f = this._directionality) === null || _f === void 0 ? void 0 : _f.value) === 'rtl') {
                        this.openMenu();
                        (_h = (_g = this.menuPanel) === null || _g === void 0 ? void 0 : _g._menu) === null || _h === void 0 ? void 0 : _h.focusFirstItem('keyboard');
                    }
                    else {
                        this._getMenuStack().closeLatest(2 /* currentItem */);
                    }
                }
                break;
            case DOWN_ARROW:
            case UP_ARROW:
                if (!this._isParentVertical()) {
                    event.preventDefault();
                    this.openMenu();
                    keyCode === DOWN_ARROW
                        ? (_k = (_j = this.menuPanel) === null || _j === void 0 ? void 0 : _j._menu) === null || _k === void 0 ? void 0 : _k.focusFirstItem('keyboard') : (_m = (_l = this.menuPanel) === null || _l === void 0 ? void 0 : _l._menu) === null || _m === void 0 ? void 0 : _m.focusLastItem('keyboard');
                }
                break;
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
                    '(keydown)': '_toggleOnKeydown($event)',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1pdGVtLXRyaWdnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY2RrLWV4cGVyaW1lbnRhbC9tZW51L21lbnUtaXRlbS10cmlnZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osVUFBVSxFQUNWLGdCQUFnQixFQUNoQixNQUFNLEVBRU4sUUFBUSxHQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUVMLE9BQU8sRUFDUCxhQUFhLEdBR2QsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUVsRyxPQUFPLEVBQU8sUUFBUSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFHaEQ7Ozs7Ozs7O0dBUUc7QUFXSCxNQUFNLE9BQU8sa0JBQWtCO0lBNkI3QixZQUNtQixXQUFvQyxFQUNsQyxpQkFBbUMsRUFDckMsUUFBaUIsRUFDQyxXQUFpQixFQUN2QixlQUFnQztRQUo1QyxnQkFBVyxHQUFYLFdBQVcsQ0FBeUI7UUFDbEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNyQyxhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQ0MsZ0JBQVcsR0FBWCxXQUFXLENBQU07UUFDdkIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBakIvRCx3REFBd0Q7UUFDdEIsV0FBTSxHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxGLHlEQUF5RDtRQUN2QixXQUFNLEdBQXVCLElBQUksWUFB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QUFFLG1CQUFtQjtnQkFDN0IsSUFBSSxFQUFFO29CQUNKLFdBQVcsRUFBRSwwQkFBMEI7b0JBQ3ZDLFVBQVUsRUFBRSxJQUFJO29CQUNoQixlQUFlLEVBQUUsTUFBTTtvQkFDdkIsc0JBQXNCLEVBQUUsY0FBYztpQkFDdkM7YUFDRjs7O1lBdENDLFVBQVU7WUFDVixnQkFBZ0I7WUFTaEIsT0FBTzs0Q0E4REosTUFBTSxTQUFDLFFBQVE7WUFsRVosY0FBYyx1QkFtRWpCLFFBQVE7Ozt3QkFoQ1YsS0FBSyxTQUFDLG1CQUFtQjtxQkFnQnpCLE1BQU0sU0FBQyxlQUFlO3FCQUd0QixNQUFNLFNBQUMsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgRWxlbWVudFJlZixcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgSW5qZWN0LFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RGlyZWN0aW9uYWxpdHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7VGVtcGxhdGVQb3J0YWx9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHtcbiAgT3ZlcmxheVJlZixcbiAgT3ZlcmxheSxcbiAgT3ZlcmxheUNvbmZpZyxcbiAgQ29ubmVjdGVkUG9zaXRpb24sXG4gIEZsZXhpYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneSxcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHtTUEFDRSwgRU5URVIsIFJJR0hUX0FSUk9XLCBMRUZUX0FSUk9XLCBET1dOX0FSUk9XLCBVUF9BUlJPV30gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7Q2RrTWVudVBhbmVsfSBmcm9tICcuL21lbnUtcGFuZWwnO1xuaW1wb3J0IHtNZW51LCBDREtfTUVOVX0gZnJvbSAnLi9tZW51LWludGVyZmFjZSc7XG5pbXBvcnQge0ZvY3VzTmV4dH0gZnJvbSAnLi9tZW51LXN0YWNrJztcblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0byBiZSBjb21iaW5lZCB3aXRoIENka01lbnVJdGVtIHdoaWNoIG9wZW5zIHRoZSBNZW51IGl0IGlzIGJvdW5kIHRvLiBJZiB0aGVcbiAqIGVsZW1lbnQgaXMgaW4gYSB0b3AgbGV2ZWwgTWVudUJhciBpdCB3aWxsIG9wZW4gdGhlIG1lbnUgb24gY2xpY2ssIG9yIGlmIGEgc2libGluZyBpcyBhbHJlYWR5XG4gKiBvcGVuZWQgaXQgd2lsbCBvcGVuIG9uIGhvdmVyLiBJZiBpdCBpcyBpbnNpZGUgb2YgYSBNZW51IGl0IHdpbGwgb3BlbiB0aGUgYXR0YWNoZWQgU3VibWVudSBvblxuICogaG92ZXIgcmVnYXJkbGVzcyBvZiBpdHMgc2libGluZyBzdGF0ZS5cbiAqXG4gKiBUaGUgZGlyZWN0aXZlIG11c3QgYmUgcGxhY2VkIGFsb25nIHdpdGggdGhlIGBjZGtNZW51SXRlbWAgZGlyZWN0aXZlIGluIG9yZGVyIHRvIGVuYWJsZSBmdWxsXG4gKiBmdW5jdGlvbmFsaXR5LlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY2RrTWVudUl0ZW1dW2Nka01lbnVUcmlnZ2VyRm9yXScsXG4gIGV4cG9ydEFzOiAnY2RrTWVudVRyaWdnZXJGb3InLFxuICBob3N0OiB7XG4gICAgJyhrZXlkb3duKSc6ICdfdG9nZ2xlT25LZXlkb3duKCRldmVudCknLFxuICAgICd0YWJpbmRleCc6ICctMScsXG4gICAgJ2FyaWEtaGFzcG9wdXAnOiAnbWVudScsXG4gICAgJ1thdHRyLmFyaWEtZXhwYW5kZWRdJzogJ2lzTWVudU9wZW4oKScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIENka01lbnVJdGVtVHJpZ2dlciBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIC8qKiBUZW1wbGF0ZSByZWZlcmVuY2UgdmFyaWFibGUgdG8gdGhlIG1lbnUgdGhpcyB0cmlnZ2VyIG9wZW5zICovXG4gIEBJbnB1dCgnY2RrTWVudVRyaWdnZXJGb3InKVxuICBnZXQgbWVudVBhbmVsKCk6IENka01lbnVQYW5lbCB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX21lbnVQYW5lbDtcbiAgfVxuICBzZXQgbWVudVBhbmVsKHBhbmVsOiBDZGtNZW51UGFuZWwgfCB1bmRlZmluZWQpIHtcbiAgICB0aGlzLl9tZW51UGFuZWwgPSBwYW5lbDtcblxuICAgIGlmICh0aGlzLl9tZW51UGFuZWwpIHtcbiAgICAgIHRoaXMuX21lbnVQYW5lbC5fbWVudVN0YWNrID0gdGhpcy5fZ2V0TWVudVN0YWNrKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFJlZmVyZW5jZSB0byB0aGUgTWVudVBhbmVsIHRoaXMgdHJpZ2dlciB0b2dnbGVzLiAqL1xuICBwcml2YXRlIF9tZW51UGFuZWw/OiBDZGtNZW51UGFuZWw7XG5cbiAgLyoqIEVtaXRzIHdoZW4gdGhlIGF0dGFjaGVkIG1lbnUgaXMgcmVxdWVzdGVkIHRvIG9wZW4gKi9cbiAgQE91dHB1dCgnY2RrTWVudU9wZW5lZCcpIHJlYWRvbmx5IG9wZW5lZDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKiBFbWl0cyB3aGVuIHRoZSBhdHRhY2hlZCBtZW51IGlzIHJlcXVlc3RlZCB0byBjbG9zZSAqL1xuICBAT3V0cHV0KCdjZGtNZW51Q2xvc2VkJykgcmVhZG9ubHkgY2xvc2VkOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqIEEgcmVmZXJlbmNlIHRvIHRoZSBvdmVybGF5IHdoaWNoIG1hbmFnZXMgdGhlIHRyaWdnZXJlZCBtZW51ICovXG4gIHByaXZhdGUgX292ZXJsYXlSZWY6IE92ZXJsYXlSZWYgfCBudWxsID0gbnVsbDtcblxuICAvKiogVGhlIGNvbnRlbnQgb2YgdGhlIG1lbnUgcGFuZWwgb3BlbmVkIGJ5IHRoaXMgdHJpZ2dlci4gKi9cbiAgcHJpdmF0ZSBfcGFuZWxDb250ZW50OiBUZW1wbGF0ZVBvcnRhbDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3ZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJpdmF0ZSByZWFkb25seSBfb3ZlcmxheTogT3ZlcmxheSxcbiAgICBASW5qZWN0KENES19NRU5VKSBwcml2YXRlIHJlYWRvbmx5IF9wYXJlbnRNZW51OiBNZW51LFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgcmVhZG9ubHkgX2RpcmVjdGlvbmFsaXR5PzogRGlyZWN0aW9uYWxpdHlcbiAgKSB7fVxuXG4gIC8qKiBPcGVuL2Nsb3NlIHRoZSBhdHRhY2hlZCBtZW51IGlmIHRoZSB0cmlnZ2VyIGhhcyBiZWVuIGNvbmZpZ3VyZWQgd2l0aCBvbmUgKi9cbiAgdG9nZ2xlKCkge1xuICAgIGlmICh0aGlzLmhhc01lbnUoKSkge1xuICAgICAgdGhpcy5pc01lbnVPcGVuKCkgPyB0aGlzLmNsb3NlTWVudSgpIDogdGhpcy5vcGVuTWVudSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBPcGVuIHRoZSBhdHRhY2hlZCBtZW51LiAqL1xuICBvcGVuTWVudSgpIHtcbiAgICBpZiAoIXRoaXMuaXNNZW51T3BlbigpKSB7XG4gICAgICB0aGlzLm9wZW5lZC5uZXh0KCk7XG5cbiAgICAgIHRoaXMuX292ZXJsYXlSZWYgPSB0aGlzLl9vdmVybGF5UmVmIHx8IHRoaXMuX292ZXJsYXkuY3JlYXRlKHRoaXMuX2dldE92ZXJsYXlDb25maWcoKSk7XG4gICAgICB0aGlzLl9vdmVybGF5UmVmLmF0dGFjaCh0aGlzLl9nZXRQb3J0YWwoKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIENsb3NlIHRoZSBvcGVuZWQgbWVudS4gKi9cbiAgY2xvc2VNZW51KCkge1xuICAgIGlmICh0aGlzLmlzTWVudU9wZW4oKSkge1xuICAgICAgdGhpcy5jbG9zZWQubmV4dCgpO1xuXG4gICAgICB0aGlzLl9vdmVybGF5UmVmIS5kZXRhY2goKTtcbiAgICB9XG4gIH1cblxuICAvKiogUmV0dXJuIHRydWUgaWYgdGhlIHRyaWdnZXIgaGFzIGFuIGF0dGFjaGVkIG1lbnUgKi9cbiAgaGFzTWVudSgpIHtcbiAgICByZXR1cm4gISF0aGlzLm1lbnVQYW5lbDtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBtZW51IHRoaXMgYnV0dG9uIGlzIGEgdHJpZ2dlciBmb3IgaXMgb3BlbiAqL1xuICBpc01lbnVPcGVuKCkge1xuICAgIHJldHVybiB0aGlzLl9vdmVybGF5UmVmID8gdGhpcy5fb3ZlcmxheVJlZi5oYXNBdHRhY2hlZCgpIDogZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgcmVmZXJlbmNlIHRvIHRoZSByZW5kZXJlZCBNZW51IGlmIHRoZSBNZW51IGlzIG9wZW4gYW5kIGl0IGlzIHZpc2libGUgaW4gdGhlIERPTS5cbiAgICogQHJldHVybiB0aGUgbWVudSBpZiBpdCBpcyBvcGVuLCBvdGhlcndpc2UgdW5kZWZpbmVkLlxuICAgKi9cbiAgZ2V0TWVudSgpOiBNZW51IHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5tZW51UGFuZWw/Ll9tZW51O1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMga2V5Ym9hcmQgZXZlbnRzIGZvciB0aGUgbWVudSBpdGVtLCBzcGVjaWZpY2FsbHkgb3BlbmluZy9jbG9zaW5nIHRoZSBhdHRhY2hlZCBtZW51IGFuZFxuICAgKiBmb2N1c2luZyB0aGUgYXBwcm9wcmlhdGUgc3VibWVudSBpdGVtLlxuICAgKiBAcGFyYW0gZXZlbnQgdGhlIGtleWJvYXJkIGV2ZW50IHRvIGhhbmRsZVxuICAgKi9cbiAgX3RvZ2dsZU9uS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGNvbnN0IGtleUNvZGUgPSBldmVudC5rZXlDb2RlO1xuICAgIHN3aXRjaCAoa2V5Q29kZSkge1xuICAgICAgY2FzZSBTUEFDRTpcbiAgICAgIGNhc2UgRU5URVI6XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMudG9nZ2xlKCk7XG4gICAgICAgIHRoaXMubWVudVBhbmVsPy5fbWVudT8uZm9jdXNGaXJzdEl0ZW0oJ2tleWJvYXJkJyk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFJJR0hUX0FSUk9XOlxuICAgICAgICBpZiAodGhpcy5faXNQYXJlbnRWZXJ0aWNhbCgpKSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBpZiAodGhpcy5fZGlyZWN0aW9uYWxpdHk/LnZhbHVlID09PSAncnRsJykge1xuICAgICAgICAgICAgdGhpcy5fZ2V0TWVudVN0YWNrKCkuY2xvc2VMYXRlc3QoRm9jdXNOZXh0LmN1cnJlbnRJdGVtKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vcGVuTWVudSgpO1xuICAgICAgICAgICAgdGhpcy5tZW51UGFuZWw/Ll9tZW51Py5mb2N1c0ZpcnN0SXRlbSgna2V5Ym9hcmQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgTEVGVF9BUlJPVzpcbiAgICAgICAgaWYgKHRoaXMuX2lzUGFyZW50VmVydGljYWwoKSkge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgaWYgKHRoaXMuX2RpcmVjdGlvbmFsaXR5Py52YWx1ZSA9PT0gJ3J0bCcpIHtcbiAgICAgICAgICAgIHRoaXMub3Blbk1lbnUoKTtcbiAgICAgICAgICAgIHRoaXMubWVudVBhbmVsPy5fbWVudT8uZm9jdXNGaXJzdEl0ZW0oJ2tleWJvYXJkJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2dldE1lbnVTdGFjaygpLmNsb3NlTGF0ZXN0KEZvY3VzTmV4dC5jdXJyZW50SXRlbSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERPV05fQVJST1c6XG4gICAgICBjYXNlIFVQX0FSUk9XOlxuICAgICAgICBpZiAoIXRoaXMuX2lzUGFyZW50VmVydGljYWwoKSkge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhpcy5vcGVuTWVudSgpO1xuICAgICAgICAgIGtleUNvZGUgPT09IERPV05fQVJST1dcbiAgICAgICAgICAgID8gdGhpcy5tZW51UGFuZWw/Ll9tZW51Py5mb2N1c0ZpcnN0SXRlbSgna2V5Ym9hcmQnKVxuICAgICAgICAgICAgOiB0aGlzLm1lbnVQYW5lbD8uX21lbnU/LmZvY3VzTGFzdEl0ZW0oJ2tleWJvYXJkJyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLyoqIEdldCB0aGUgY29uZmlndXJhdGlvbiBvYmplY3QgdXNlZCB0byBjcmVhdGUgdGhlIG92ZXJsYXkgKi9cbiAgcHJpdmF0ZSBfZ2V0T3ZlcmxheUNvbmZpZygpIHtcbiAgICByZXR1cm4gbmV3IE92ZXJsYXlDb25maWcoe1xuICAgICAgcG9zaXRpb25TdHJhdGVneTogdGhpcy5fZ2V0T3ZlcmxheVBvc2l0aW9uU3RyYXRlZ3koKSxcbiAgICAgIHNjcm9sbFN0cmF0ZWd5OiB0aGlzLl9vdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMuYmxvY2soKSxcbiAgICAgIGRpcmVjdGlvbjogdGhpcy5fZGlyZWN0aW9uYWxpdHksXG4gICAgfSk7XG4gIH1cblxuICAvKiogQnVpbGQgdGhlIHBvc2l0aW9uIHN0cmF0ZWd5IGZvciB0aGUgb3ZlcmxheSB3aGljaCBzcGVjaWZpZXMgd2hlcmUgdG8gcGxhY2UgdGhlIG1lbnUgKi9cbiAgcHJpdmF0ZSBfZ2V0T3ZlcmxheVBvc2l0aW9uU3RyYXRlZ3koKTogRmxleGlibGVDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5IHtcbiAgICByZXR1cm4gdGhpcy5fb3ZlcmxheVxuICAgICAgLnBvc2l0aW9uKClcbiAgICAgIC5mbGV4aWJsZUNvbm5lY3RlZFRvKHRoaXMuX2VsZW1lbnRSZWYpXG4gICAgICAud2l0aFBvc2l0aW9ucyh0aGlzLl9nZXRPdmVybGF5UG9zaXRpb25zKCkpO1xuICB9XG5cbiAgLyoqIERldGVybWluZSBhbmQgcmV0dXJuIHdoZXJlIHRvIHBvc2l0aW9uIHRoZSBvcGVuZWQgbWVudSByZWxhdGl2ZSB0byB0aGUgbWVudSBpdGVtICovXG4gIHByaXZhdGUgX2dldE92ZXJsYXlQb3NpdGlvbnMoKTogQ29ubmVjdGVkUG9zaXRpb25bXSB7XG4gICAgLy8gVE9ETzogdXNlIGEgY29tbW9uIHBvc2l0aW9uaW5nIGNvbmZpZyBmcm9tIChwb3NzaWJseSkgY2RrL292ZXJsYXlcbiAgICByZXR1cm4gdGhpcy5fcGFyZW50TWVudS5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnXG4gICAgICA/IFtcbiAgICAgICAgICB7b3JpZ2luWDogJ3N0YXJ0Jywgb3JpZ2luWTogJ2JvdHRvbScsIG92ZXJsYXlYOiAnc3RhcnQnLCBvdmVybGF5WTogJ3RvcCd9LFxuICAgICAgICAgIHtvcmlnaW5YOiAnc3RhcnQnLCBvcmlnaW5ZOiAndG9wJywgb3ZlcmxheVg6ICdzdGFydCcsIG92ZXJsYXlZOiAnYm90dG9tJ30sXG4gICAgICAgICAge29yaWdpblg6ICdlbmQnLCBvcmlnaW5ZOiAnYm90dG9tJywgb3ZlcmxheVg6ICdlbmQnLCBvdmVybGF5WTogJ3RvcCd9LFxuICAgICAgICAgIHtvcmlnaW5YOiAnZW5kJywgb3JpZ2luWTogJ3RvcCcsIG92ZXJsYXlYOiAnZW5kJywgb3ZlcmxheVk6ICdib3R0b20nfSxcbiAgICAgICAgXVxuICAgICAgOiBbXG4gICAgICAgICAge29yaWdpblg6ICdlbmQnLCBvcmlnaW5ZOiAndG9wJywgb3ZlcmxheVg6ICdzdGFydCcsIG92ZXJsYXlZOiAndG9wJ30sXG4gICAgICAgICAge29yaWdpblg6ICdlbmQnLCBvcmlnaW5ZOiAnYm90dG9tJywgb3ZlcmxheVg6ICdzdGFydCcsIG92ZXJsYXlZOiAnYm90dG9tJ30sXG4gICAgICAgICAge29yaWdpblg6ICdzdGFydCcsIG9yaWdpblk6ICd0b3AnLCBvdmVybGF5WDogJ2VuZCcsIG92ZXJsYXlZOiAndG9wJ30sXG4gICAgICAgICAge29yaWdpblg6ICdzdGFydCcsIG9yaWdpblk6ICdib3R0b20nLCBvdmVybGF5WDogJ2VuZCcsIG92ZXJsYXlZOiAnYm90dG9tJ30sXG4gICAgICAgIF07XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBwb3J0YWwgdG8gYmUgYXR0YWNoZWQgdG8gdGhlIG92ZXJsYXkgd2hpY2ggY29udGFpbnMgdGhlIG1lbnUuIEFsbG93cyBmb3IgdGhlIG1lbnVcbiAgICogY29udGVudCB0byBjaGFuZ2UgZHluYW1pY2FsbHkgYW5kIGJlIHJlZmxlY3RlZCBpbiB0aGUgYXBwbGljYXRpb24uXG4gICAqL1xuICBwcml2YXRlIF9nZXRQb3J0YWwoKSB7XG4gICAgY29uc3QgaGFzTWVudUNvbnRlbnRDaGFuZ2VkID0gdGhpcy5tZW51UGFuZWw/Ll90ZW1wbGF0ZVJlZiAhPT0gdGhpcy5fcGFuZWxDb250ZW50Py50ZW1wbGF0ZVJlZjtcbiAgICBpZiAodGhpcy5tZW51UGFuZWwgJiYgKCF0aGlzLl9wYW5lbENvbnRlbnQgfHwgaGFzTWVudUNvbnRlbnRDaGFuZ2VkKSkge1xuICAgICAgdGhpcy5fcGFuZWxDb250ZW50ID0gbmV3IFRlbXBsYXRlUG9ydGFsKHRoaXMubWVudVBhbmVsLl90ZW1wbGF0ZVJlZiwgdGhpcy5fdmlld0NvbnRhaW5lclJlZik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX3BhbmVsQ29udGVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHRydWUgaWYgaWYgdGhlIGVuY2xvc2luZyBwYXJlbnQgbWVudSBpcyBjb25maWd1cmVkIGluIGEgdmVydGljYWwgb3JpZW50YXRpb24uXG4gICAqL1xuICBwcml2YXRlIF9pc1BhcmVudFZlcnRpY2FsKCkge1xuICAgIHJldHVybiB0aGlzLl9wYXJlbnRNZW51Lm9yaWVudGF0aW9uID09PSAndmVydGljYWwnO1xuICB9XG5cbiAgLyoqIEdldCB0aGUgbWVudSBzdGFjayBmcm9tIHRoZSBwYXJlbnQuICovXG4gIHByaXZhdGUgX2dldE1lbnVTdGFjaygpIHtcbiAgICAvLyBXZSB1c2UgYSBmdW5jdGlvbiBzaW5jZSBhdCB0aGUgY29uc3RydWN0aW9uIG9mIHRoZSBNZW51SXRlbVRyaWdnZXIgdGhlIHBhcmVudCBNZW51IHdvbid0IGhhdmVcbiAgICAvLyBpdHMgbWVudSBzdGFjayBzZXQuIFRoZXJlZm9yZSB3ZSBuZWVkIHRvIHJlZmVyZW5jZSB0aGUgbWVudSBzdGFjayBmcm9tIHRoZSBwYXJlbnQgZWFjaCB0aW1lXG4gICAgLy8gd2Ugd2FudCB0byB1c2UgaXQuXG4gICAgcmV0dXJuIHRoaXMuX3BhcmVudE1lbnUuX21lbnVTdGFjaztcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2Rlc3Ryb3lPdmVybGF5KCk7XG4gIH1cblxuICAvKiogRGVzdHJveSBhbmQgdW5zZXQgdGhlIG92ZXJsYXkgcmVmZXJlbmNlIGl0IGlmIGV4aXN0cyAqL1xuICBwcml2YXRlIF9kZXN0cm95T3ZlcmxheSgpIHtcbiAgICBpZiAodGhpcy5fb3ZlcmxheVJlZikge1xuICAgICAgdGhpcy5fb3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gICAgICB0aGlzLl9vdmVybGF5UmVmID0gbnVsbDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==