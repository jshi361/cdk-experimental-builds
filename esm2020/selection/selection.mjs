/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { isDataSource } from '@angular/cdk/collections';
import { Directive, EventEmitter, Input, Output, } from '@angular/core';
import { Observable, of as observableOf, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SelectionSet } from './selection-set';
import * as i0 from "@angular/core";
/**
 * Manages the selection states of the items and provides methods to check and update the selection
 * states.
 * It must be applied to the parent element if `cdkSelectionToggle`, `cdkSelectAll`,
 * `cdkRowSelection` and `cdkSelectionColumn` are applied.
 */
export class CdkSelection {
    constructor() {
        /** Emits when selection changes. */
        this.change = new EventEmitter();
        this._destroyed = new Subject();
        this.selectAllState = 'none';
    }
    get dataSource() {
        return this._dataSource;
    }
    set dataSource(dataSource) {
        if (this._dataSource !== dataSource) {
            this._switchDataSource(dataSource);
        }
    }
    /** Whether to support multiple selection */
    get multiple() {
        return this._multiple;
    }
    set multiple(multiple) {
        this._multiple = coerceBooleanProperty(multiple);
    }
    _switchDataSource(dataSource) {
        this._data = [];
        // TODO: Move this logic to a shared function in `cdk/collections`.
        if (isDataSource(this._dataSource)) {
            this._dataSource.disconnect(this);
        }
        if (this._renderChangeSubscription) {
            this._renderChangeSubscription.unsubscribe();
            this._renderChangeSubscription = null;
        }
        this._dataSource = dataSource;
    }
    _observeRenderChanges() {
        if (!this._dataSource) {
            return;
        }
        let dataStream;
        if (isDataSource(this._dataSource)) {
            dataStream = this._dataSource.connect(this);
        }
        else if (this._dataSource instanceof Observable) {
            dataStream = this._dataSource;
        }
        else if (Array.isArray(this._dataSource)) {
            dataStream = observableOf(this._dataSource);
        }
        if (dataStream == null && (typeof ngDevMode === 'undefined' || ngDevMode)) {
            throw Error('Unknown data source');
        }
        this._renderChangeSubscription = dataStream
            .pipe(takeUntil(this._destroyed))
            .subscribe(data => {
            this._data = data || [];
        });
    }
    ngOnInit() {
        this._selection = new SelectionSet(this._multiple, this.trackByFn);
        this._selection.changed.pipe(takeUntil(this._destroyed)).subscribe(change => {
            this._updateSelectAllState();
            this.change.emit(change);
        });
    }
    ngAfterContentChecked() {
        if (this._dataSource && !this._renderChangeSubscription) {
            this._observeRenderChanges();
        }
    }
    ngOnDestroy() {
        this._destroyed.next();
        this._destroyed.complete();
        if (isDataSource(this._dataSource)) {
            this._dataSource.disconnect(this);
        }
    }
    /** Toggles selection for a given value. `index` is required if `trackBy` is used. */
    toggleSelection(value, index) {
        if (!!this.trackByFn && index == null && (typeof ngDevMode === 'undefined' || ngDevMode)) {
            throw Error('CdkSelection: index required when trackBy is used');
        }
        if (this.isSelected(value, index)) {
            this._selection.deselect({ value, index });
        }
        else {
            this._selection.select({ value, index });
        }
    }
    /**
     * Toggles select-all. If no value is selected, select all values. If all values or some of the
     * values are selected, de-select all values.
     */
    toggleSelectAll() {
        if (!this._multiple && (typeof ngDevMode === 'undefined' || ngDevMode)) {
            throw Error('CdkSelection: multiple selection not enabled');
        }
        if (this.selectAllState === 'none') {
            this._selectAll();
        }
        else {
            this._clearAll();
        }
    }
    /** Checks whether a value is selected. `index` is required if `trackBy` is used. */
    isSelected(value, index) {
        if (!!this.trackByFn && index == null && (typeof ngDevMode === 'undefined' || ngDevMode)) {
            throw Error('CdkSelection: index required when trackBy is used');
        }
        return this._selection.isSelected({ value, index });
    }
    /** Checks whether all values are selected. */
    isAllSelected() {
        return this._data.every((value, index) => this._selection.isSelected({ value, index }));
    }
    /** Checks whether partially selected. */
    isPartialSelected() {
        return (!this.isAllSelected() &&
            this._data.some((value, index) => this._selection.isSelected({ value, index })));
    }
    _selectAll() {
        const toSelect = [];
        this._data.forEach((value, index) => {
            toSelect.push({ value, index });
        });
        this._selection.select(...toSelect);
    }
    _clearAll() {
        const toDeselect = [];
        this._data.forEach((value, index) => {
            toDeselect.push({ value, index });
        });
        this._selection.deselect(...toDeselect);
    }
    _updateSelectAllState() {
        if (this.isAllSelected()) {
            this.selectAllState = 'all';
        }
        else if (this.isPartialSelected()) {
            this.selectAllState = 'partial';
        }
        else {
            this.selectAllState = 'none';
        }
    }
}
CdkSelection.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: CdkSelection, deps: [], target: i0.ɵɵFactoryTarget.Directive });
CdkSelection.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0-next.15", type: CdkSelection, selector: "[cdkSelection]", inputs: { dataSource: "dataSource", trackByFn: ["trackBy", "trackByFn"], multiple: ["cdkSelectionMultiple", "multiple"] }, outputs: { change: "cdkSelectionChange" }, exportAs: ["cdkSelection"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: CdkSelection, decorators: [{
            type: Directive,
            args: [{
                    selector: '[cdkSelection]',
                    exportAs: 'cdkSelection',
                }]
        }], propDecorators: { dataSource: [{
                type: Input
            }], trackByFn: [{
                type: Input,
                args: ['trackBy']
            }], multiple: [{
                type: Input,
                args: ['cdkSelectionMultiple']
            }], change: [{
                type: Output,
                args: ['cdkSelectionChange']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2Nkay1leHBlcmltZW50YWwvc2VsZWN0aW9uL3NlbGVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQWUscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRSxPQUFPLEVBQStCLFlBQVksRUFBWSxNQUFNLDBCQUEwQixDQUFDO0FBQy9GLE9BQU8sRUFFTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEdBRVAsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFVBQVUsRUFBRSxFQUFFLElBQUksWUFBWSxFQUFFLE9BQU8sRUFBZSxNQUFNLE1BQU0sQ0FBQztBQUMzRSxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFekMsT0FBTyxFQUF1QyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7QUFFbkY7Ozs7O0dBS0c7QUFLSCxNQUFNLE9BQU8sWUFBWTtJQUp6QjtRQThCRSxvQ0FBb0M7UUFDRyxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQXNCLENBQUM7UUFRL0UsZUFBVSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFvSnpDLG1CQUFjLEdBQW1CLE1BQU0sQ0FBQztLQUd6QztJQXZMQyxJQUNJLFVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQztJQUNELElBQUksVUFBVSxDQUFDLFVBQThCO1FBQzNDLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxVQUFVLEVBQUU7WUFDbkMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3BDO0lBQ0gsQ0FBQztJQUtELDRDQUE0QztJQUM1QyxJQUNJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUNE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QUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFTyxxQkFBcUI7UUFDM0IsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7U0FDN0I7YUFBTSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFO1lBQ25DLElBQUksQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDO1NBQ2pDO2FBQU07WUFDTCxJQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQztTQUM5QjtJQUNILENBQUM7O2lIQXJMVSxZQUFZO3FHQUFaLFlBQVk7bUdBQVosWUFBWTtrQkFKeEIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixRQUFRLEVBQUUsY0FBYztpQkFDekI7OEJBS0ssVUFBVTtzQkFEYixLQUFLO2dCQVdZLFNBQVM7c0JBQTFCLEtBQUs7dUJBQUMsU0FBUztnQkFJWixRQUFRO3NCQURYLEtBQUs7dUJBQUMsc0JBQXNCO2dCQVVVLE1BQU07c0JBQTVDLE1BQU07dUJBQUMsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Qm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge0NvbGxlY3Rpb25WaWV3ZXIsIERhdGFTb3VyY2UsIGlzRGF0YVNvdXJjZSwgTGlzdFJhbmdlfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50Q2hlY2tlZCxcbiAgRGlyZWN0aXZlLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBUcmFja0J5RnVuY3Rpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBvZiBhcyBvYnNlcnZhYmxlT2YsIFN1YmplY3QsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge3Rha2VVbnRpbH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge1NlbGVjdGFibGVXaXRoSW5kZXgsIFNlbGVjdGlvbkNoYW5nZSwgU2VsZWN0aW9uU2V0fSBmcm9tICcuL3NlbGVjdGlvbi1zZXQnO1xuXG4vKipcbiAqIE1hbmFnZXMgdGhlIHNlbGVjdGlvbiBzdGF0ZXMgb2YgdGhlIGl0ZW1zIGFuZCBwcm92aWRlcyBtZXRob2RzIHRvIGNoZWNrIGFuZCB1cGRhdGUgdGhlIHNlbGVjdGlvblxuICogc3RhdGVzLlxuICogSXQgbXVzdCBiZSBhcHBsaWVkIHRvIHRoZSBwYXJlbnQgZWxlbWVudCBpZiBgY2RrU2VsZWN0aW9uVG9nZ2xlYCwgYGNka1NlbGVjdEFsbGAsXG4gKiBgY2RrUm93U2VsZWN0aW9uYCBhbmQgYGNka1NlbGVjdGlvbkNvbHVtbmAgYXJlIGFwcGxpZWQuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjZGtTZWxlY3Rpb25dJyxcbiAgZXhwb3J0QXM6ICdjZGtTZWxlY3Rpb24nLFxufSlcbmV4cG9ydCBjbGFzcyBDZGtTZWxlY3Rpb248VD4gaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudENoZWNrZWQsIENvbGxlY3Rpb25WaWV3ZXIsIE9uRGVzdHJveSB7XG4gIHZpZXdDaGFuZ2U6IE9ic2VydmFibGU8TGlzdFJhbmdlPjtcblxuICBASW5wdXQoKVxuICBnZXQgZGF0YVNvdXJjZSgpOiBUYWJsZURhdGFTb3VyY2U8VD4ge1xuICAgIHJldHVybiB0aGlzLl9kYXRhU291cmNlO1xuICB9XG4gIHNldCBkYXRhU291cmNlKGRhdGFTb3VyY2U6IFRhYmxlRGF0YVNvdXJjZTxUPikge1xuICAgIGlmICh0aGlzLl9kYXRhU291cmNlICE9PSBkYXRhU291cmNlKSB7XG4gICAgICB0aGlzLl9zd2l0Y2hEYXRhU291cmNlKGRhdGFTb3VyY2UpO1xuICAgIH1cbiAgfVxuICBwcml2YXRlIF9kYXRhU291cmNlOiBUYWJsZURhdGFTb3VyY2U8VD47XG5cbiAgQElucHV0KCd0cmFja0J5JykgdHJhY2tCeUZuOiBUcmFja0J5RnVuY3Rpb248VD47XG5cbiAgLyoqIFdoZXRoZXIgdG8gc3VwcG9ydCBtdWx0aXBsZSBzZWxlY3Rpb24gKi9cbiAgQElucHV0KCdjZGtTZWxlY3Rpb25NdWx0aXBsZScpXG4gIGdldCBtdWx0aXBsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fbXVsdGlwbGU7XG4gIH1cbiAgc2V0IG11bHRpcGxlKG11bHRpcGxlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fbXVsdGlwbGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkobXVsdGlwbGUpO1xuICB9XG4gIHByb3RlY3RlZCBfbXVsdGlwbGU6IGJvb2xlYW47XG5cbiAgLyoqIEVtaXRzIHdoZW4gc2VsZWN0aW9uIGNoYW5nZXMuICovXG4gIEBPdXRwdXQoJ2Nka1NlbGVjdGlvbkNoYW5nZScpIHJlYWRvbmx5IGNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8U2VsZWN0aW9uQ2hhbmdlPFQ+PigpO1xuXG4gIC8qKiBMYXRlc3QgZGF0YSBwcm92aWRlZCBieSB0aGUgZGF0YSBzb3VyY2UuICovXG4gIHByaXZhdGUgX2RhdGE6IFRbXSB8IHJlYWRvbmx5IFRbXTtcblxuICAvKiogU3Vic2NyaXB0aW9uIHRoYXQgbGlzdGVucyBmb3IgdGhlIGRhdGEgcHJvdmlkZWQgYnkgdGhlIGRhdGEgc291cmNlLiAgKi9cbiAgcHJpdmF0ZSBfcmVuZGVyQ2hhbmdlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gfCBudWxsO1xuXG4gIHByaXZhdGUgX2Rlc3Ryb3llZCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgcHJpdmF0ZSBfc2VsZWN0aW9uOiBTZWxlY3Rpb25TZXQ8VD47XG5cbiAgcHJpdmF0ZSBfc3dpdGNoRGF0YVNvdXJjZShkYXRhU291cmNlOiBUYWJsZURhdGFTb3VyY2U8VD4pIHtcbiAgICB0aGlzLl9kYXRhID0gW107XG5cbiAgICAvLyBUT0RPOiBNb3ZlIHRoaXMgbG9naWMgdG8gYSBzaGFyZWQgZnVuY3Rpb24gaW4gYGNkay9jb2xsZWN0aW9uc2AuXG4gICAgaWYgKGlzRGF0YVNvdXJjZSh0aGlzLl9kYXRhU291cmNlKSkge1xuICAgICAgdGhpcy5fZGF0YVNvdXJjZS5kaXNjb25uZWN0KHRoaXMpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9yZW5kZXJDaGFuZ2VTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuX3JlbmRlckNoYW5nZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5fcmVuZGVyQ2hhbmdlU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICB9XG5cbiAgICB0aGlzLl9kYXRhU291cmNlID0gZGF0YVNvdXJjZTtcbiAgfVxuXG4gIHByaXZhdGUgX29ic2VydmVSZW5kZXJDaGFuZ2VzKCkge1xuICAgIGlmICghdGhpcy5fZGF0YVNvdXJjZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBkYXRhU3RyZWFtOiBPYnNlcnZhYmxlPHJlYWRvbmx5IFRbXT4gfCB1bmRlZmluZWQ7XG5cbiAgICBpZiAoaXNEYXRhU291cmNlKHRoaXMuX2RhdGFTb3VyY2UpKSB7XG4gICAgICBkYXRhU3RyZWFtID0gdGhpcy5fZGF0YVNvdXJjZS5jb25uZWN0KHRoaXMpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fZGF0YVNvdXJjZSBpbnN0YW5jZW9mIE9ic2VydmFibGUpIHtcbiAgICAgIGRhdGFTdHJlYW0gPSB0aGlzLl9kYXRhU291cmNlO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLl9kYXRhU291cmNlKSkge1xuICAgICAgZGF0YVN0cmVhbSA9IG9ic2VydmFibGVPZih0aGlzLl9kYXRhU291cmNlKTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YVN0cmVhbSA9PSBudWxsICYmICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpKSB7XG4gICAgICB0aHJvdyBFcnJvcignVW5rbm93biBkYXRhIHNvdXJjZScpO1xuICAgIH1cblxuICAgIHRoaXMuX3JlbmRlckNoYW5nZVN1YnNjcmlwdGlvbiA9IGRhdGFTdHJlYW0hXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveWVkKSlcbiAgICAgIC5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgIHRoaXMuX2RhdGEgPSBkYXRhIHx8IFtdO1xuICAgICAgfSk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9zZWxlY3Rpb24gPSBuZXcgU2VsZWN0aW9uU2V0PFQ+KHRoaXMuX211bHRpcGxlLCB0aGlzLnRyYWNrQnlGbik7XG4gICAgdGhpcy5fc2VsZWN0aW9uLmNoYW5nZWQucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveWVkKSkuc3Vic2NyaWJlKGNoYW5nZSA9PiB7XG4gICAgICB0aGlzLl91cGRhdGVTZWxlY3RBbGxTdGF0ZSgpO1xuICAgICAgdGhpcy5jaGFuZ2UuZW1pdChjaGFuZ2UpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xuICAgIGlmICh0aGlzLl9kYXRhU291cmNlICYmICF0aGlzLl9yZW5kZXJDaGFuZ2VTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuX29ic2VydmVSZW5kZXJDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fZGVzdHJveWVkLm5leHQoKTtcbiAgICB0aGlzLl9kZXN0cm95ZWQuY29tcGxldGUoKTtcblxuICAgIGlmIChpc0RhdGFTb3VyY2UodGhpcy5fZGF0YVNvdXJjZSkpIHtcbiAgICAgIHRoaXMuX2RhdGFTb3VyY2UuZGlzY29ubmVjdCh0aGlzKTtcbiAgICB9XG4gIH1cblxuICAvKiogVG9nZ2xlcyBzZWxlY3Rpb24gZm9yIGEgZ2l2ZW4gdmFsdWUuIGBpbmRleGAgaXMgcmVxdWlyZWQgaWYgYHRyYWNrQnlgIGlzIHVzZWQuICovXG4gIHRvZ2dsZVNlbGVjdGlvbih2YWx1ZTogVCwgaW5kZXg/OiBudW1iZXIpIHtcbiAgICBpZiAoISF0aGlzLnRyYWNrQnlGbiAmJiBpbmRleCA9PSBudWxsICYmICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpKSB7XG4gICAgICB0aHJvdyBFcnJvcignQ2RrU2VsZWN0aW9uOiBpbmRleCByZXF1aXJlZCB3aGVuIHRyYWNrQnkgaXMgdXNlZCcpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzU2VsZWN0ZWQodmFsdWUsIGluZGV4KSkge1xuICAgICAgdGhpcy5fc2VsZWN0aW9uLmRlc2VsZWN0KHt2YWx1ZSwgaW5kZXh9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2VsZWN0aW9uLnNlbGVjdCh7dmFsdWUsIGluZGV4fSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgc2VsZWN0LWFsbC4gSWYgbm8gdmFsdWUgaXMgc2VsZWN0ZWQsIHNlbGVjdCBhbGwgdmFsdWVzLiBJZiBhbGwgdmFsdWVzIG9yIHNvbWUgb2YgdGhlXG4gICAqIHZhbHVlcyBhcmUgc2VsZWN0ZWQsIGRlLXNlbGVjdCBhbGwgdmFsdWVzLlxuICAgKi9cbiAgdG9nZ2xlU2VsZWN0QWxsKCkge1xuICAgIGlmICghdGhpcy5fbXVsdGlwbGUgJiYgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkpIHtcbiAgICAgIHRocm93IEVycm9yKCdDZGtTZWxlY3Rpb246IG11bHRpcGxlIHNlbGVjdGlvbiBub3QgZW5hYmxlZCcpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNlbGVjdEFsbFN0YXRlID09PSAnbm9uZScpIHtcbiAgICAgIHRoaXMuX3NlbGVjdEFsbCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9jbGVhckFsbCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBDaGVja3Mgd2hldGhlciBhIHZhbHVlIGlzIHNlbGVjdGVkLiBgaW5kZXhgIGlzIHJlcXVpcmVkIGlmIGB0cmFja0J5YCBpcyB1c2VkLiAqL1xuICBpc1NlbGVjdGVkKHZhbHVlOiBULCBpbmRleD86IG51bWJlcikge1xuICAgIGlmICghIXRoaXMudHJhY2tCeUZuICYmIGluZGV4ID09IG51bGwgJiYgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkpIHtcbiAgICAgIHRocm93IEVycm9yKCdDZGtTZWxlY3Rpb246IGluZGV4IHJlcXVpcmVkIHdoZW4gdHJhY2tCeSBpcyB1c2VkJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGlvbi5pc1NlbGVjdGVkKHt2YWx1ZSwgaW5kZXh9KTtcbiAgfVxuXG4gIC8qKiBDaGVja3Mgd2hldGhlciBhbGwgdmFsdWVzIGFyZSBzZWxlY3RlZC4gKi9cbiAgaXNBbGxTZWxlY3RlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YS5ldmVyeSgodmFsdWUsIGluZGV4KSA9PiB0aGlzLl9zZWxlY3Rpb24uaXNTZWxlY3RlZCh7dmFsdWUsIGluZGV4fSkpO1xuICB9XG5cbiAgLyoqIENoZWNrcyB3aGV0aGVyIHBhcnRpYWxseSBzZWxlY3RlZC4gKi9cbiAgaXNQYXJ0aWFsU2VsZWN0ZWQoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgICF0aGlzLmlzQWxsU2VsZWN0ZWQoKSAmJlxuICAgICAgdGhpcy5fZGF0YS5zb21lKCh2YWx1ZSwgaW5kZXgpID0+IHRoaXMuX3NlbGVjdGlvbi5pc1NlbGVjdGVkKHt2YWx1ZSwgaW5kZXh9KSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2VsZWN0QWxsKCkge1xuICAgIGNvbnN0IHRvU2VsZWN0OiBTZWxlY3RhYmxlV2l0aEluZGV4PFQ+W10gPSBbXTtcbiAgICB0aGlzLl9kYXRhLmZvckVhY2goKHZhbHVlLCBpbmRleCkgPT4ge1xuICAgICAgdG9TZWxlY3QucHVzaCh7dmFsdWUsIGluZGV4fSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9zZWxlY3Rpb24uc2VsZWN0KC4uLnRvU2VsZWN0KTtcbiAgfVxuXG4gIHByaXZhdGUgX2NsZWFyQWxsKCkge1xuICAgIGNvbnN0IHRvRGVzZWxlY3Q6IFNlbGVjdGFibGVXaXRoSW5kZXg8VD5bXSA9IFtdO1xuICAgIHRoaXMuX2RhdGEuZm9yRWFjaCgodmFsdWUsIGluZGV4KSA9PiB7XG4gICAgICB0b0Rlc2VsZWN0LnB1c2goe3ZhbHVlLCBpbmRleH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fc2VsZWN0aW9uLmRlc2VsZWN0KC4uLnRvRGVzZWxlY3QpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlU2VsZWN0QWxsU3RhdGUoKSB7XG4gICAgaWYgKHRoaXMuaXNBbGxTZWxlY3RlZCgpKSB7XG4gICAgICB0aGlzLnNlbGVjdEFsbFN0YXRlID0gJ2FsbCc7XG4gICAgfSBlbHNlIGlmICh0aGlzLmlzUGFydGlhbFNlbGVjdGVkKCkpIHtcbiAgICAgIHRoaXMuc2VsZWN0QWxsU3RhdGUgPSAncGFydGlhbCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VsZWN0QWxsU3RhdGUgPSAnbm9uZSc7XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0QWxsU3RhdGU6IFNlbGVjdEFsbFN0YXRlID0gJ25vbmUnO1xuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9tdWx0aXBsZTogQm9vbGVhbklucHV0O1xufVxuXG50eXBlIFNlbGVjdEFsbFN0YXRlID0gJ2FsbCcgfCAnbm9uZScgfCAncGFydGlhbCc7XG50eXBlIFRhYmxlRGF0YVNvdXJjZTxUPiA9IERhdGFTb3VyY2U8VD4gfCBPYnNlcnZhYmxlPHJlYWRvbmx5IFRbXT4gfCByZWFkb25seSBUW107XG4iXX0=