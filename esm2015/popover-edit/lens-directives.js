/**
 * @fileoverview added by tsickle
 * Generated from: src/cdk-experimental/popover-edit/lens-directives.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Subject } from 'rxjs';
import { Directive, ElementRef, EventEmitter, Input, HostListener, } from '@angular/core';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { EDIT_PANE_SELECTOR } from './constants';
import { closest } from './polyfill';
import { EditRef } from './edit-ref';
/**
 * A directive that attaches to a form within the edit lens.
 * It coordinates the form state with the table-wide edit system and handles
 * closing the edit lens when the form is submitted or the user clicks
 * out.
 * @template FormValue
 */
let CdkEditControl = /** @class */ (() => {
    /**
     * A directive that attaches to a form within the edit lens.
     * It coordinates the form state with the table-wide edit system and handles
     * closing the edit lens when the form is submitted or the user clicks
     * out.
     * @template FormValue
     */
    class CdkEditControl {
        /**
         * @param {?} elementRef
         * @param {?} editRef
         */
        constructor(elementRef, editRef) {
            this.elementRef = elementRef;
            this.editRef = editRef;
            this.destroyed = new Subject();
            /**
             * Specifies what should happen when the user clicks outside of the edit lens.
             * The default behavior is to close the lens without submitting the form.
             */
            this.clickOutBehavior = 'close';
            this.preservedFormValueChange = new EventEmitter();
            /**
             * Determines whether the lens will close on form submit if the form is not in a valid
             * state. By default the lens will remain open.
             */
            this.ignoreSubmitUnlessValid = true;
        }
        /**
         * @return {?}
         */
        ngOnInit() {
            this.editRef.init(this.preservedFormValue);
            this.editRef.finalValue.subscribe(this.preservedFormValueChange);
            this.editRef.blurred.subscribe((/**
             * @return {?}
             */
            () => this._handleBlur()));
        }
        /**
         * @return {?}
         */
        ngOnDestroy() {
            this.destroyed.next();
            this.destroyed.complete();
        }
        /**
         * Called when the form submits. If ignoreSubmitUnlessValid is true, checks
         * the form for validity before proceeding.
         * Updates the revert state with the latest submitted value then closes the edit.
         * @return {?}
         */
        // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
        // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
        // can move this back into `host`.
        // tslint:disable:no-host-decorator-in-concrete
        handleFormSubmit() {
            if (this.ignoreSubmitUnlessValid && !this.editRef.isValid()) {
                return;
            }
            this.editRef.updateRevertValue();
            this.editRef.close();
        }
        /**
         * Called on Escape keyup. Closes the edit.
         * @return {?}
         */
        close() {
            // todo - allow this behavior to be customized as well, such as calling
            // reset before close
            this.editRef.close();
        }
        /**
         * Called on click anywhere in the document.
         * If the click was outside of the lens, trigger the specified click out behavior.
         * @param {?} evt
         * @return {?}
         */
        // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
        // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
        // can move this back into `host`.
        // tslint:disable:no-host-decorator-in-concrete
        handlePossibleClickOut(evt) {
            if (closest(evt.target, EDIT_PANE_SELECTOR)) {
                return;
            }
            switch (this.clickOutBehavior) {
                case 'submit':
                    // Manually cause the form to submit before closing.
                    this._triggerFormSubmit();
                    this.editRef.close();
                    break;
                case 'close':
                    this.editRef.close();
                    break;
                default:
                    break;
            }
        }
        // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
        // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
        // can move this back into `host`.
        // tslint:disable:no-host-decorator-in-concrete
        /**
         * @param {?} event
         * @return {?}
         */
        _handleKeydown(event) {
            if (event.key === 'Escape' && !hasModifierKey(event)) {
                this.close();
                event.preventDefault();
            }
        }
        /**
         * Triggers submit on tab out if clickOutBehavior is 'submit'.
         * @private
         * @return {?}
         */
        _handleBlur() {
            if (this.clickOutBehavior === 'submit') {
                // Manually cause the form to submit before closing.
                this._triggerFormSubmit();
            }
        }
        /**
         * @private
         * @return {?}
         */
        _triggerFormSubmit() {
            (/** @type {?} */ (this.elementRef.nativeElement)).dispatchEvent(new Event('submit'));
        }
    }
    CdkEditControl.decorators = [
        { type: Directive, args: [{
                    selector: 'form[cdkEditControl]',
                    inputs: [
                        'clickOutBehavior: cdkEditControlClickOutBehavior',
                        'preservedFormValue: cdkEditControlPreservedFormValue',
                        'ignoreSubmitUnlessValid: cdkEditControlIgnoreSubmitUnlessValid',
                    ],
                    outputs: ['preservedFormValueChange: cdkEditControlPreservedFormValueChange'],
                    providers: [EditRef],
                },] }
    ];
    /** @nocollapse */
    CdkEditControl.ctorParameters = () => [
        { type: ElementRef },
        { type: EditRef }
    ];
    CdkEditControl.propDecorators = {
        handleFormSubmit: [{ type: HostListener, args: ['ngSubmit',] }],
        handlePossibleClickOut: [{ type: HostListener, args: ['document:click', ['$event'],] }],
        _handleKeydown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
    };
    return CdkEditControl;
})();
export { CdkEditControl };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    CdkEditControl.prototype.destroyed;
    /**
     * Specifies what should happen when the user clicks outside of the edit lens.
     * The default behavior is to close the lens without submitting the form.
     * @type {?}
     */
    CdkEditControl.prototype.clickOutBehavior;
    /**
     * A two-way binding for storing unsubmitted form state. If not provided
     * then form state will be discarded on close. The PeristBy directive is offered
     * as a convenient shortcut for these bindings.
     * @type {?}
     */
    CdkEditControl.prototype.preservedFormValue;
    /** @type {?} */
    CdkEditControl.prototype.preservedFormValueChange;
    /**
     * Determines whether the lens will close on form submit if the form is not in a valid
     * state. By default the lens will remain open.
     * @type {?}
     */
    CdkEditControl.prototype.ignoreSubmitUnlessValid;
    /**
     * @type {?}
     * @protected
     */
    CdkEditControl.prototype.elementRef;
    /** @type {?} */
    CdkEditControl.prototype.editRef;
}
/**
 * Reverts the form to its initial or previously submitted state on click.
 * @template FormValue
 */
let CdkEditRevert = /** @class */ (() => {
    /**
     * Reverts the form to its initial or previously submitted state on click.
     * @template FormValue
     */
    class CdkEditRevert {
        /**
         * @param {?} editRef
         */
        constructor(editRef) {
            this.editRef = editRef;
            /**
             * Type of the button. Defaults to `button` to avoid accident form submits.
             */
            this.type = 'button';
        }
        // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
        // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
        // can move this back into `host`.
        // tslint:disable:no-host-decorator-in-concrete
        /**
         * @return {?}
         */
        revertEdit() {
            this.editRef.reset();
        }
    }
    CdkEditRevert.decorators = [
        { type: Directive, args: [{
                    selector: 'button[cdkEditRevert]',
                    host: {
                        'type': 'button',
                    }
                },] }
    ];
    /** @nocollapse */
    CdkEditRevert.ctorParameters = () => [
        { type: EditRef }
    ];
    CdkEditRevert.propDecorators = {
        type: [{ type: Input }],
        revertEdit: [{ type: HostListener, args: ['click',] }]
    };
    return CdkEditRevert;
})();
export { CdkEditRevert };
if (false) {
    /**
     * Type of the button. Defaults to `button` to avoid accident form submits.
     * @type {?}
     */
    CdkEditRevert.prototype.type;
    /**
     * @type {?}
     * @protected
     */
    CdkEditRevert.prototype.editRef;
}
/**
 * Closes the lens on click.
 * @template FormValue
 */
let CdkEditClose = /** @class */ (() => {
    /**
     * Closes the lens on click.
     * @template FormValue
     */
    class CdkEditClose {
        /**
         * @param {?} elementRef
         * @param {?} editRef
         */
        constructor(elementRef, editRef) {
            this.elementRef = elementRef;
            this.editRef = editRef;
            /** @type {?} */
            const nativeElement = elementRef.nativeElement;
            // Prevent accidental form submits.
            if (nativeElement.nodeName === 'BUTTON' && !nativeElement.getAttribute('type')) {
                nativeElement.setAttribute('type', 'button');
            }
        }
        // In Ivy the `host` metadata will be merged, whereas in ViewEngine it is overridden. In order
        // to avoid double event listeners, we need to use `HostListener`. Once Ivy is the default, we
        // can move this back into `host`.
        // tslint:disable:no-host-decorator-in-concrete
        /**
         * @return {?}
         */
        closeEdit() {
            // Note that we use `click` here, rather than a keyboard event, because some screen readers
            // will emit a fake click event instead of an enter keyboard event on buttons.
            this.editRef.close();
        }
    }
    CdkEditClose.decorators = [
        { type: Directive, args: [{ selector: '[cdkEditClose]' },] }
    ];
    /** @nocollapse */
    CdkEditClose.ctorParameters = () => [
        { type: ElementRef },
        { type: EditRef }
    ];
    CdkEditClose.propDecorators = {
        closeEdit: [{ type: HostListener, args: ['click',] }, { type: HostListener, args: ['keyup.enter',] }, { type: HostListener, args: ['keyup.space',] }]
    };
    return CdkEditClose;
})();
export { CdkEditClose };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    CdkEditClose.prototype.elementRef;
    /**
     * @type {?}
     * @protected
     */
    CdkEditClose.prototype.editRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVucy1kaXJlY3RpdmVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2Nkay1leHBlcmltZW50YWwvcG9wb3Zlci1lZGl0L2xlbnMtZGlyZWN0aXZlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzdCLE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFHWixLQUFLLEVBQ0wsWUFBWSxHQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNyRCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDL0MsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLFlBQVksQ0FBQztBQUNuQyxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sWUFBWSxDQUFDOzs7Ozs7OztBQVduQzs7Ozs7Ozs7SUFBQSxNQVVhLGNBQWM7Ozs7O1FBdUJ6QixZQUErQixVQUFzQixFQUFXLE9BQTJCO1lBQTVELGVBQVUsR0FBVixVQUFVLENBQVk7WUFBVyxZQUFPLEdBQVAsT0FBTyxDQUFvQjtZQXRCeEUsY0FBUyxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7Ozs7O1lBTW5ELHFCQUFnQixHQUFnQyxPQUFPLENBQUM7WUFRL0MsNkJBQXdCLEdBQUcsSUFBSSxZQUFZLEVBQWEsQ0FBQzs7Ozs7WUFNbEUsNEJBQXVCLEdBQUcsSUFBSSxDQUFDO1FBRStELENBQUM7Ozs7UUFFL0YsUUFBUTtZQUNOLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUNqRSxJQUFJLENB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QVk7Ozs7OztJQUVuQixrQ0FBc0Q7Ozs7O0lBQ3RELCtCQUE4QyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBJbnB1dCxcbiAgSG9zdExpc3RlbmVyLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7aGFzTW9kaWZpZXJLZXl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQge0VESVRfUEFORV9TRUxFQ1RPUn0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHtjbG9zZXN0fSBmcm9tICcuL3BvbHlmaWxsJztcbmltcG9ydCB7RWRpdFJlZn0gZnJvbSAnLi9lZGl0LXJlZic7XG5cbi8qKiBPcHRpb25zIGZvciB3aGF0IGRvIHRvIHdoZW4gdGhlIHVzZXIgY2xpY2tzIG91dHNpZGUgb2YgYW4gZWRpdCBsZW5zLiAqL1xuZXhwb3J0IHR5cGUgUG9wb3ZlckVkaXRDbGlja091dEJlaGF2aW9yID0gJ2Nsb3NlJyB8ICdzdWJtaXQnIHwgJ25vb3AnO1xuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRoYXQgYXR0YWNoZXMgdG8gYSBmb3JtIHdpdGhpbiB0aGUgZWRpdCBsZW5zLlxuICogSXQgY29vcmRpbmF0ZXMgdGhlIGZvcm0gc3RhdGUgd2l0aCB0aGUgdGFibGUtd2lkZSBlZGl0IHN5c3RlbSBhbmQgaGFuZGxlc1xuICogY2xvc2luZyB0aGUgZWRpdCBsZW5zIHdoZW4gdGhlIGZvcm0gaXMgc3VibWl0dGVkIG9yIHRoZSB1c2VyIGNsaWNrc1xuICogb3V0LlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdmb3JtW2Nka0VkaXRDb250cm9sXScsXG4gIGlucHV0czogW1xuICAgICdjbGlja091dEJlaGF2aW9yOiBjZGtFZGl0Q29udHJvbENsaWNrT3V0QmVoYXZpb3InLFxuICAgICdwcmVzZXJ2ZWRGb3JtVmFsdWU6IGNka0VkaXRDb250cm9sUHJlc2VydmVkRm9ybVZhbHVlJyxcbiAgICAnaWdub3JlU3VibWl0VW5sZXNzVmFsaWQ6IGNka0VkaXRDb250cm9sSWdub3JlU3VibWl0VW5sZXNzVmFsaWQnLFxuICBdLFxuICBvdXRwdXRzOiBbJ3ByZXNlcnZlZEZvcm1WYWx1ZUNoYW5nZTogY2RrRWRpdENvbnRyb2xQcmVzZXJ2ZWRGb3JtVmFsdWVDaGFuZ2UnXSxcbiAgcHJvdmlkZXJzOiBbRWRpdFJlZl0sXG59KVxuZXhwb3J0IGNsYXNzIENka0VkaXRDb250cm9sPEZvcm1WYWx1ZT4gaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIHByb3RlY3RlZCByZWFkb25seSBkZXN0cm95ZWQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIC8qKlxuICAgKiBTcGVjaWZpZXMgd2hhdCBzaG91bGQgaGFwcGVuIHdoZW4gdGhlIHVzZXIgY2xpY2tzIG91dHNpZGUgb2YgdGhlIGVkaXQgbGVucy5cbiAgICogVGhlIGRlZmF1bHQgYmVoYXZpb3IgaXMgdG8gY2xvc2UgdGhlIGxlbnMgd2l0aG91dCBzdWJtaXR0aW5nIHRoZSBmb3JtLlxuICAgKi9cbiAgY2xpY2tPdXRCZWhhdmlvcjogUG9wb3ZlckVkaXRDbGlja091dEJlaGF2aW9yID0gJ2Nsb3NlJztcblxuICAvKipcbiAgICogQSB0d28td2F5IGJpbmRpbmcgZm9yIHN0b3JpbmcgdW5zdWJtaXR0ZWQgZm9ybSBzdGF0ZS4gSWYgbm90IHByb3ZpZGVkXG4gICAqIHRoZW4gZm9ybSBzdGF0ZSB3aWxsIGJlIGRpc2NhcmRlZCBvbiBjbG9zZS4gVGhlIFBlcmlzdEJ5IGRpcmVjdGl2ZSBpcyBvZmZlcmVkXG4gICAqIGFzIGEgY29udmVuaWVudCBzaG9ydGN1dCBmb3IgdGhlc2UgYmluZGluZ3MuXG4gICAqL1xuICBwcmVzZXJ2ZWRGb3JtVmFsdWU/OiBGb3JtVmFsdWU7XG4gIHJlYWRvbmx5IHByZXNlcnZlZEZvcm1WYWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Rm9ybVZhbHVlPigpO1xuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIGxlbnMgd2lsbCBjbG9zZSBvbiBmb3JtIHN1Ym1pdCBpZiB0aGUgZm9ybSBpcyBub3QgaW4gYSB2YWxpZFxuICAgKiBzdGF0ZS4gQnkgZGVmYXVsdCB0aGUgbGVucyB3aWxsIHJlbWFpbiBvcGVuLlxuICAgKi9cbiAgaWdub3JlU3VibWl0VW5sZXNzVmFsaWQgPSB0cnVlO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCByZWFkb25seSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCByZWFkb25seSBlZGl0UmVmOiBFZGl0UmVmPEZvcm1WYWx1ZT4pIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5lZGl0UmVmLmluaXQodGhpcy5wcmVzZXJ2ZWRGb3JtVmFsdWUpO1xuICAgIHRoaXMuZWRpdFJlZi5maW5hbFZhbHVlLnN1YnNjcmliZSh0aGlzLnByZXNlcnZlZEZvcm1WYWx1ZUNoYW5nZSk7XG4gICAgdGhpcy5lZGl0UmVmLmJsdXJyZWQuc3Vic2NyaWJlKCgpID0+IHRoaXMuX2hhbmRsZUJsdXIoKSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3llZC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95ZWQuY29tcGxldGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgZm9ybSBzdWJtaXRzLiBJZiBpZ25vcmVTdWJtaXRVbmxlc3NWYWxpZCBpcyB0cnVlLCBjaGVja3NcbiAgICogdGhlIGZvcm0gZm9yIHZhbGlkaXR5IGJlZm9yZSBwcm9jZWVkaW5nLlxuICAgKiBVcGRhdGVzIHRoZSByZXZlcnQgc3RhdGUgd2l0aCB0aGUgbGF0ZXN0IHN1Ym1pdHRlZCB2YWx1ZSB0aGVuIGNsb3NlcyB0aGUgZWRpdC5cbiAgICovXG4gIC8vIEluIEl2eSB0aGUgYGhvc3RgIG1ldGFkYXRhIHdpbGwgYmUgbWVyZ2VkLCB3aGVyZWFzIGluIFZpZXdFbmdpbmUgaXQgaXMgb3ZlcnJpZGRlbi4gSW4gb3JkZXJcbiAgLy8gdG8gYXZvaWQgZG91YmxlIGV2ZW50IGxpc3RlbmVycywgd2UgbmVlZCB0byB1c2UgYEhvc3RMaXN0ZW5lcmAuIE9uY2UgSXZ5IGlzIHRoZSBkZWZhdWx0LCB3ZVxuICAvLyBjYW4gbW92ZSB0aGlzIGJhY2sgaW50byBgaG9zdGAuXG4gIC8vIHRzbGludDpkaXNhYmxlOm5vLWhvc3QtZGVjb3JhdG9yLWluLWNvbmNyZXRlXG4gIEBIb3N0TGlzdGVuZXIoJ25nU3VibWl0JylcbiAgaGFuZGxlRm9ybVN1Ym1pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pZ25vcmVTdWJtaXRVbmxlc3NWYWxpZCAmJiAhdGhpcy5lZGl0UmVmLmlzVmFsaWQoKSkgeyByZXR1cm47IH1cblxuICAgIHRoaXMuZWRpdFJlZi51cGRhdGVSZXZlcnRWYWx1ZSgpO1xuICAgIHRoaXMuZWRpdFJlZi5jbG9zZSgpO1xuICB9XG5cbiAgLyoqIENhbGxlZCBvbiBFc2NhcGUga2V5dXAuIENsb3NlcyB0aGUgZWRpdC4gKi9cbiAgY2xvc2UoKTogdm9pZCB7XG4gICAgLy8gdG9kbyAtIGFsbG93IHRoaXMgYmVoYXZpb3IgdG8gYmUgY3VzdG9taXplZCBhcyB3ZWxsLCBzdWNoIGFzIGNhbGxpbmdcbiAgICAvLyByZXNldCBiZWZvcmUgY2xvc2VcbiAgICB0aGlzLmVkaXRSZWYuY2xvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgb24gY2xpY2sgYW55d2hlcmUgaW4gdGhlIGRvY3VtZW50LlxuICAgKiBJZiB0aGUgY2xpY2sgd2FzIG91dHNpZGUgb2YgdGhlIGxlbnMsIHRyaWdnZXIgdGhlIHNwZWNpZmllZCBjbGljayBvdXQgYmVoYXZpb3IuXG4gICAqL1xuICAvLyBJbiBJdnkgdGhlIGBob3N0YCBtZXRhZGF0YSB3aWxsIGJlIG1lcmdlZCwgd2hlcmVhcyBpbiBWaWV3RW5naW5lIGl0IGlzIG92ZXJyaWRkZW4uIEluIG9yZGVyXG4gIC8vIHRvIGF2b2lkIGRvdWJsZSBldmVudCBsaXN0ZW5lcnMsIHdlIG5lZWQgdG8gdXNlIGBIb3N0TGlzdGVuZXJgLiBPbmNlIEl2eSBpcyB0aGUgZGVmYXVsdCwgd2VcbiAgLy8gY2FuIG1vdmUgdGhpcyBiYWNrIGludG8gYGhvc3RgLlxuICAvLyB0c2xpbnQ6ZGlzYWJsZTpuby1ob3N0LWRlY29yYXRvci1pbi1jb25jcmV0ZVxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjbGljaycsIFsnJGV2ZW50J10pXG4gIGhhbmRsZVBvc3NpYmxlQ2xpY2tPdXQoZXZ0OiBFdmVudCk6IHZvaWQge1xuICAgIGlmIChjbG9zZXN0KGV2dC50YXJnZXQsIEVESVRfUEFORV9TRUxFQ1RPUikpIHsgcmV0dXJuOyB9XG4gICAgc3dpdGNoICh0aGlzLmNsaWNrT3V0QmVoYXZpb3IpIHtcbiAgICAgIGNhc2UgJ3N1Ym1pdCc6XG4gICAgICAgIC8vIE1hbnVhbGx5IGNhdXNlIHRoZSBmb3JtIHRvIHN1Ym1pdCBiZWZvcmUgY2xvc2luZy5cbiAgICAgICAgdGhpcy5fdHJpZ2dlckZvcm1TdWJtaXQoKTtcbiAgICAgICAgdGhpcy5lZGl0UmVmLmNsb3NlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnY2xvc2UnOlxuICAgICAgICB0aGlzLmVkaXRSZWYuY2xvc2UoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICAvLyBJbiBJdnkgdGhlIGBob3N0YCBtZXRhZGF0YSB3aWxsIGJlIG1lcmdlZCwgd2hlcmVhcyBpbiBWaWV3RW5naW5lIGl0IGlzIG92ZXJyaWRkZW4uIEluIG9yZGVyXG4gIC8vIHRvIGF2b2lkIGRvdWJsZSBldmVudCBsaXN0ZW5lcnMsIHdlIG5lZWQgdG8gdXNlIGBIb3N0TGlzdGVuZXJgLiBPbmNlIEl2eSBpcyB0aGUgZGVmYXVsdCwgd2VcbiAgLy8gY2FuIG1vdmUgdGhpcyBiYWNrIGludG8gYGhvc3RgLlxuICAvLyB0c2xpbnQ6ZGlzYWJsZTpuby1ob3N0LWRlY29yYXRvci1pbi1jb25jcmV0ZVxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgX2hhbmRsZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBpZiAoZXZlbnQua2V5ID09PSAnRXNjYXBlJyAmJiAhaGFzTW9kaWZpZXJLZXkoZXZlbnQpKSB7XG4gICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBUcmlnZ2VycyBzdWJtaXQgb24gdGFiIG91dCBpZiBjbGlja091dEJlaGF2aW9yIGlzICdzdWJtaXQnLiAqL1xuICBwcml2YXRlIF9oYW5kbGVCbHVyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNsaWNrT3V0QmVoYXZpb3IgPT09ICdzdWJtaXQnKSB7XG4gICAgICAvLyBNYW51YWxseSBjYXVzZSB0aGUgZm9ybSB0byBzdWJtaXQgYmVmb3JlIGNsb3NpbmcuXG4gICAgICB0aGlzLl90cmlnZ2VyRm9ybVN1Ym1pdCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3RyaWdnZXJGb3JtU3VibWl0KCkge1xuICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IS5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnc3VibWl0JykpO1xuICB9XG59XG5cbi8qKiBSZXZlcnRzIHRoZSBmb3JtIHRvIGl0cyBpbml0aWFsIG9yIHByZXZpb3VzbHkgc3VibWl0dGVkIHN0YXRlIG9uIGNsaWNrLiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnYnV0dG9uW2Nka0VkaXRSZXZlcnRdJyxcbiAgaG9zdDoge1xuICAgICd0eXBlJzogJ2J1dHRvbicsIC8vIFByZXZlbnRzIGFjY2lkZW50YWwgZm9ybSBzdWJtaXRzLlxuICB9XG59KVxuZXhwb3J0IGNsYXNzIENka0VkaXRSZXZlcnQ8Rm9ybVZhbHVlPiB7XG4gIC8qKiBUeXBlIG9mIHRoZSBidXR0b24uIERlZmF1bHRzIHRvIGBidXR0b25gIHRvIGF2b2lkIGFjY2lkZW50IGZvcm0gc3VibWl0cy4gKi9cbiAgQElucHV0KCkgdHlwZTogc3RyaW5nID0gJ2J1dHRvbic7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgZWRpdFJlZjogRWRpdFJlZjxGb3JtVmFsdWU+KSB7fVxuXG4gIC8vIEluIEl2eSB0aGUgYGhvc3RgIG1ldGFkYXRhIHdpbGwgYmUgbWVyZ2VkLCB3aGVyZWFzIGluIFZpZXdFbmdpbmUgaXQgaXMgb3ZlcnJpZGRlbi4gSW4gb3JkZXJcbiAgLy8gdG8gYXZvaWQgZG91YmxlIGV2ZW50IGxpc3RlbmVycywgd2UgbmVlZCB0byB1c2UgYEhvc3RMaXN0ZW5lcmAuIE9uY2UgSXZ5IGlzIHRoZSBkZWZhdWx0LCB3ZVxuICAvLyBjYW4gbW92ZSB0aGlzIGJhY2sgaW50byBgaG9zdGAuXG4gIC8vIHRzbGludDpkaXNhYmxlOm5vLWhvc3QtZGVjb3JhdG9yLWluLWNvbmNyZXRlXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgcmV2ZXJ0RWRpdCgpOiB2b2lkIHtcbiAgICB0aGlzLmVkaXRSZWYucmVzZXQoKTtcbiAgfVxufVxuXG4vKiogQ2xvc2VzIHRoZSBsZW5zIG9uIGNsaWNrLiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbY2RrRWRpdENsb3NlXSd9KVxuZXhwb3J0IGNsYXNzIENka0VkaXRDbG9zZTxGb3JtVmFsdWU+IHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgZWRpdFJlZjogRWRpdFJlZjxGb3JtVmFsdWU+KSB7XG5cbiAgICBjb25zdCBuYXRpdmVFbGVtZW50ID0gZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuXG4gICAgLy8gUHJldmVudCBhY2NpZGVudGFsIGZvcm0gc3VibWl0cy5cbiAgICBpZiAobmF0aXZlRWxlbWVudC5ub2RlTmFtZSA9PT0gJ0JVVFRPTicgJiYgIW5hdGl2ZUVsZW1lbnQuZ2V0QXR0cmlidXRlKCd0eXBlJykpIHtcbiAgICAgIG5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEluIEl2eSB0aGUgYGhvc3RgIG1ldGFkYXRhIHdpbGwgYmUgbWVyZ2VkLCB3aGVyZWFzIGluIFZpZXdFbmdpbmUgaXQgaXMgb3ZlcnJpZGRlbi4gSW4gb3JkZXJcbiAgLy8gdG8gYXZvaWQgZG91YmxlIGV2ZW50IGxpc3RlbmVycywgd2UgbmVlZCB0byB1c2UgYEhvc3RMaXN0ZW5lcmAuIE9uY2UgSXZ5IGlzIHRoZSBkZWZhdWx0LCB3ZVxuICAvLyBjYW4gbW92ZSB0aGlzIGJhY2sgaW50byBgaG9zdGAuXG4gIC8vIHRzbGludDpkaXNhYmxlOm5vLWhvc3QtZGVjb3JhdG9yLWluLWNvbmNyZXRlXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgQEhvc3RMaXN0ZW5lcigna2V5dXAuZW50ZXInKVxuICBASG9zdExpc3RlbmVyKCdrZXl1cC5zcGFjZScpXG4gIGNsb3NlRWRpdCgpOiB2b2lkIHtcbiAgICAvLyBOb3RlIHRoYXQgd2UgdXNlIGBjbGlja2AgaGVyZSwgcmF0aGVyIHRoYW4gYSBrZXlib2FyZCBldmVudCwgYmVjYXVzZSBzb21lIHNjcmVlbiByZWFkZXJzXG4gICAgLy8gd2lsbCBlbWl0IGEgZmFrZSBjbGljayBldmVudCBpbnN0ZWFkIG9mIGFuIGVudGVyIGtleWJvYXJkIGV2ZW50IG9uIGJ1dHRvbnMuXG4gICAgdGhpcy5lZGl0UmVmLmNsb3NlKCk7XG4gIH1cbn1cbiJdfQ==