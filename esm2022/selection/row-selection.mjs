/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Directive, Input } from '@angular/core';
import { CdkSelection } from './selection';
import * as i0 from "@angular/core";
import * as i1 from "./selection";
/**
 * Applies `cdk-selected` class and `aria-selected` to an element.
 *
 * Must be used within a parent `CdkSelection` directive.
 * Must be provided with the value. The index is required if `trackBy` is used on the `CdkSelection`
 * directive.
 */
export class CdkRowSelection {
    get index() {
        return this._index;
    }
    set index(index) {
        this._index = coerceNumberProperty(index);
    }
    constructor(_selection) {
        this._selection = _selection;
        // We need an initializer here to avoid a TS error.
        this.value = undefined;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: CdkRowSelection, deps: [{ token: i1.CdkSelection }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.1.1", type: CdkRowSelection, selector: "[cdkRowSelection]", inputs: { value: ["cdkRowSelectionValue", "value"], index: ["cdkRowSelectionIndex", "index"] }, host: { properties: { "class.cdk-selected": "_selection.isSelected(this.value, this.index)", "attr.aria-selected": "_selection.isSelected(this.value, this.index)" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: CdkRowSelection, decorators: [{
            type: Directive,
            args: [{
                    selector: '[cdkRowSelection]',
                    host: {
                        '[class.cdk-selected]': '_selection.isSelected(this.value, this.index)',
                        '[attr.aria-selected]': '_selection.isSelected(this.value, this.index)',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i1.CdkSelection }]; }, propDecorators: { value: [{
                type: Input,
                args: ['cdkRowSelectionValue']
            }], index: [{
                type: Input,
                args: ['cdkRowSelectionIndex']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LXNlbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jZGstZXhwZXJpbWVudGFsL3NlbGVjdGlvbi9yb3ctc2VsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxvQkFBb0IsRUFBYyxNQUFNLHVCQUF1QixDQUFDO0FBQ3hFLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRS9DLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxhQUFhLENBQUM7OztBQUV6Qzs7Ozs7O0dBTUc7QUFRSCxNQUFNLE9BQU8sZUFBZTtJQUkxQixJQUNJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUNELElBQUksS0FBSyxDQUFDLEtBQWtCO1FBQzFCLElBQUksQ0FBQyxNQUFNLEdBQUcsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUdELFlBQXFCLFVBQTJCO1FBQTNCLGVBQVUsR0FBVixVQUFVLENBQWlCO1FBWmhELG1EQUFtRDtRQUNwQixVQUFLLEdBQU0sU0FBVSxDQUFDO0lBV0YsQ0FBQzs4R0FiekMsZUFBZTtrR0FBZixlQUFlOzsyRkFBZixlQUFlO2tCQVAzQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLElBQUksRUFBRTt3QkFDSixzQkFBc0IsRUFBRSwrQ0FBK0M7d0JBQ3ZFLHNCQUFzQixFQUFFLCtDQUErQztxQkFDeEU7aUJBQ0Y7bUdBR2dDLEtBQUs7c0JBQW5DLEtBQUs7dUJBQUMsc0JBQXNCO2dCQUd6QixLQUFLO3NCQURSLEtBQUs7dUJBQUMsc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Y29lcmNlTnVtYmVyUHJvcGVydHksIE51bWJlcklucHV0fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtEaXJlY3RpdmUsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtDZGtTZWxlY3Rpb259IGZyb20gJy4vc2VsZWN0aW9uJztcblxuLyoqXG4gKiBBcHBsaWVzIGBjZGstc2VsZWN0ZWRgIGNsYXNzIGFuZCBgYXJpYS1zZWxlY3RlZGAgdG8gYW4gZWxlbWVudC5cbiAqXG4gKiBNdXN0IGJlIHVzZWQgd2l0aGluIGEgcGFyZW50IGBDZGtTZWxlY3Rpb25gIGRpcmVjdGl2ZS5cbiAqIE11c3QgYmUgcHJvdmlkZWQgd2l0aCB0aGUgdmFsdWUuIFRoZSBpbmRleCBpcyByZXF1aXJlZCBpZiBgdHJhY2tCeWAgaXMgdXNlZCBvbiB0aGUgYENka1NlbGVjdGlvbmBcbiAqIGRpcmVjdGl2ZS5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2Nka1Jvd1NlbGVjdGlvbl0nLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5jZGstc2VsZWN0ZWRdJzogJ19zZWxlY3Rpb24uaXNTZWxlY3RlZCh0aGlzLnZhbHVlLCB0aGlzLmluZGV4KScsXG4gICAgJ1thdHRyLmFyaWEtc2VsZWN0ZWRdJzogJ19zZWxlY3Rpb24uaXNTZWxlY3RlZCh0aGlzLnZhbHVlLCB0aGlzLmluZGV4KScsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIENka1Jvd1NlbGVjdGlvbjxUPiB7XG4gIC8vIFdlIG5lZWQgYW4gaW5pdGlhbGl6ZXIgaGVyZSB0byBhdm9pZCBhIFRTIGVycm9yLlxuICBASW5wdXQoJ2Nka1Jvd1NlbGVjdGlvblZhbHVlJykgdmFsdWU6IFQgPSB1bmRlZmluZWQhO1xuXG4gIEBJbnB1dCgnY2RrUm93U2VsZWN0aW9uSW5kZXgnKVxuICBnZXQgaW5kZXgoKTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5faW5kZXg7XG4gIH1cbiAgc2V0IGluZGV4KGluZGV4OiBOdW1iZXJJbnB1dCkge1xuICAgIHRoaXMuX2luZGV4ID0gY29lcmNlTnVtYmVyUHJvcGVydHkoaW5kZXgpO1xuICB9XG4gIHByb3RlY3RlZCBfaW5kZXg/OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IocmVhZG9ubHkgX3NlbGVjdGlvbjogQ2RrU2VsZWN0aW9uPFQ+KSB7fVxufVxuIl19