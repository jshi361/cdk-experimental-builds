/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Subject } from 'rxjs';
/**
 * Maintains a set of selected items. Support selecting and deselecting items, and checking if a
 * value is selected.
 * When constructed with a `trackByFn`, all the items will be identified by applying the `trackByFn`
 * on them. Because `trackByFn` requires the index of the item to be passed in, the `index` field is
 * expected to be set when calling `isSelected`, `select` and `deselect`.
 */
export class SelectionSet {
    constructor(_multiple = false, _trackByFn) {
        this._multiple = _multiple;
        this._trackByFn = _trackByFn;
        this._selectionMap = new Map();
        this.changed = new Subject();
    }
    isSelected(value) {
        return this._selectionMap.has(this._getTrackedByValue(value));
    }
    select(...selects) {
        if (!this._multiple && selects.length > 1 && (typeof ngDevMode === 'undefined' || ngDevMode)) {
            throw Error('SelectionSet: not multiple selection');
        }
        const before = this._getCurrentSelection();
        if (!this._multiple) {
            this._selectionMap.clear();
        }
        const toSelect = [];
        for (const select of selects) {
            if (this.isSelected(select)) {
                continue;
            }
            toSelect.push(select);
            this._markSelected(this._getTrackedByValue(select), select);
        }
        const after = this._getCurrentSelection();
        this.changed.next({ before, after });
    }
    deselect(...selects) {
        if (!this._multiple && selects.length > 1 && (typeof ngDevMode === 'undefined' || ngDevMode)) {
            throw Error('SelectionSet: not multiple selection');
        }
        const before = this._getCurrentSelection();
        const toDeselect = [];
        for (const select of selects) {
            if (!this.isSelected(select)) {
                continue;
            }
            toDeselect.push(select);
            this._markDeselected(this._getTrackedByValue(select));
        }
        const after = this._getCurrentSelection();
        this.changed.next({ before, after });
    }
    _markSelected(key, toSelect) {
        this._selectionMap.set(key, toSelect);
    }
    _markDeselected(key) {
        this._selectionMap.delete(key);
    }
    _getTrackedByValue(select) {
        if (!this._trackByFn) {
            return select.value;
        }
        if (select.index == null && (typeof ngDevMode === 'undefined' || ngDevMode)) {
            throw Error('SelectionSet: index required when trackByFn is used.');
        }
        return this._trackByFn(select.index, select.value);
    }
    _getCurrentSelection() {
        return Array.from(this._selectionMap.values());
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLXNldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jZGstZXhwZXJpbWVudGFsL3NlbGVjdGlvbi9zZWxlY3Rpb24tc2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUdILE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUE4QjdCOzs7Ozs7R0FNRztBQUNILE1BQU0sT0FBTyxZQUFZO0lBSXZCLFlBQW9CLFlBQVksS0FBSyxFQUFVLFVBQStCO1FBQTFELGNBQVMsR0FBVCxTQUFTLENBQVE7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFxQjtRQUh0RSxrQkFBYSxHQUFHLElBQUksR0FBRyxFQUE0RCxDQUFDO1FBQzVGLFlBQU8sR0FBRyxJQUFJLE9BQU8sRUFBc0IsQ0FBQztJQUVxQyxDQUFDO0lBRWxGLFVBQVUsQ0FBQyxLQUE2QjtRQUN0QyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCxNQUFNLENBQUMsR0FBRyxPQUFpQztRQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sU0FBUyxLQUFLLFdBQVcsSUFBSSxTQUFTLENBQUMsRUFBRTtZQUM1RixNQUFNLEtBQUssQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO1NBQ3JEO1FBRUQsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFFM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUM1QjtRQUVELE1BQU0sUUFBUSxHQUE2QixFQUFFLENBQUM7UUFDOUMsS0FBSyxNQUFNLE1BQU0sSUFBSSxPQUFPLEVBQUU7WUFDNUIsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUMzQixTQUFTO2FBQ1Y7WUFFRCxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQzdEO1FBRUQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFFMUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsUUFBUSxDQUFDLEdBQUcsT0FBaUM7UUFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLFNBQVMsS0FBSyxXQUFXLElBQUksU0FBUyxDQUFDLEVBQUU7WUFDNUYsTUFBTSxLQUFLLENBQUMsc0NBQXNDLENBQUMsQ0FBQztTQUNyRDtRQUVELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQzNDLE1BQU0sVUFBVSxHQUE2QixFQUFFLENBQUM7UUFFaEQsS0FBSyxNQUFNLE1BQU0sSUFBSSxPQUFPLEVBQUU7WUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQzVCLFNBQVM7YUFDVjtZQUVELFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUN2RDtRQUVELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQzFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVPLGFBQWEsQ0FBQyxHQUFxQyxFQUFFLFFBQWdDO1FBQzNGLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRU8sZUFBZSxDQUFDLEdBQXFDO1FBQzNELElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFTyxrQkFBa0IsQ0FBQyxNQUE4QjtRQUN2RCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNwQixPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDckI7UUFFRCxJQUFJLE1BQU0sQ0FBQyxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxTQUFTLEtBQUssV0FBVyxJQUFJLFNBQVMsQ0FBQyxFQUFFO1lBQzNFLE1BQU0sS0FBSyxDQUFDLHNEQUFzRCxDQUFDLENBQUM7U0FDckU7UUFFRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQU0sRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVPLG9CQUFvQjtRQUMxQixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ2pELENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1RyYWNrQnlGdW5jdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMnO1xuXG4vKipcbiAqIE1haW50YWlucyBhIHNldCBvZiBzZWxlY3RlZCB2YWx1ZXMuIE9uZSBvciBtb3JlIHZhbHVlcyBjYW4gYmUgYWRkZWQgdG8gb3IgcmVtb3ZlZCBmcm9tIHRoZVxuICogc2VsZWN0aW9uLlxuICovXG5pbnRlcmZhY2UgVHJhY2tCeVNlbGVjdGlvbjxUPiB7XG4gIGlzU2VsZWN0ZWQodmFsdWU6IFNlbGVjdGFibGVXaXRoSW5kZXg8VD4pOiBib29sZWFuO1xuICBzZWxlY3QoLi4udmFsdWVzOiBTZWxlY3RhYmxlV2l0aEluZGV4PFQ+W10pOiB2b2lkO1xuICBkZXNlbGVjdCguLi52YWx1ZXM6IFNlbGVjdGFibGVXaXRoSW5kZXg8VD5bXSk6IHZvaWQ7XG4gIGNoYW5nZWQ6IFN1YmplY3Q8U2VsZWN0aW9uQ2hhbmdlPFQ+Pjtcbn1cblxuLyoqXG4gKiBBIHNlbGVjdGFibGUgdmFsdWUgd2l0aCBhbiBvcHRpb25hbCBpbmRleC4gVGhlIGluZGV4IGlzIHJlcXVpcmVkIHdoZW4gdGhlIHNlbGVjdGlvbiBpcyB1c2VkIHdpdGhcbiAqIGB0cmFja0J5YC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTZWxlY3RhYmxlV2l0aEluZGV4PFQ+IHtcbiAgdmFsdWU6IFQ7XG4gIGluZGV4PzogbnVtYmVyO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIGNoYW5nZSBpbiB0aGUgc2VsZWN0aW9uIHNldC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTZWxlY3Rpb25DaGFuZ2U8VD4ge1xuICBiZWZvcmU6IFNlbGVjdGFibGVXaXRoSW5kZXg8VD5bXTtcbiAgYWZ0ZXI6IFNlbGVjdGFibGVXaXRoSW5kZXg8VD5bXTtcbn1cblxuLyoqXG4gKiBNYWludGFpbnMgYSBzZXQgb2Ygc2VsZWN0ZWQgaXRlbXMuIFN1cHBvcnQgc2VsZWN0aW5nIGFuZCBkZXNlbGVjdGluZyBpdGVtcywgYW5kIGNoZWNraW5nIGlmIGFcbiAqIHZhbHVlIGlzIHNlbGVjdGVkLlxuICogV2hlbiBjb25zdHJ1Y3RlZCB3aXRoIGEgYHRyYWNrQnlGbmAsIGFsbCB0aGUgaXRlbXMgd2lsbCBiZSBpZGVudGlmaWVkIGJ5IGFwcGx5aW5nIHRoZSBgdHJhY2tCeUZuYFxuICogb24gdGhlbS4gQmVjYXVzZSBgdHJhY2tCeUZuYCByZXF1aXJlcyB0aGUgaW5kZXggb2YgdGhlIGl0ZW0gdG8gYmUgcGFzc2VkIGluLCB0aGUgYGluZGV4YCBmaWVsZCBpc1xuICogZXhwZWN0ZWQgdG8gYmUgc2V0IHdoZW4gY2FsbGluZyBgaXNTZWxlY3RlZGAsIGBzZWxlY3RgIGFuZCBgZGVzZWxlY3RgLlxuICovXG5leHBvcnQgY2xhc3MgU2VsZWN0aW9uU2V0PFQ+IGltcGxlbWVudHMgVHJhY2tCeVNlbGVjdGlvbjxUPiB7XG4gIHByaXZhdGUgX3NlbGVjdGlvbk1hcCA9IG5ldyBNYXA8VHxSZXR1cm5UeXBlPFRyYWNrQnlGdW5jdGlvbjxUPj4sIFNlbGVjdGFibGVXaXRoSW5kZXg8VD4+KCk7XG4gIGNoYW5nZWQgPSBuZXcgU3ViamVjdDxTZWxlY3Rpb25DaGFuZ2U8VD4+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbXVsdGlwbGUgPSBmYWxzZSwgcHJpdmF0ZSBfdHJhY2tCeUZuPzogVHJhY2tCeUZ1bmN0aW9uPFQ+KSB7fVxuXG4gIGlzU2VsZWN0ZWQodmFsdWU6IFNlbGVjdGFibGVXaXRoSW5kZXg8VD4pOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0aW9uTWFwLmhhcyh0aGlzLl9nZXRUcmFja2VkQnlWYWx1ZSh2YWx1ZSkpO1xuICB9XG5cbiAgc2VsZWN0KC4uLnNlbGVjdHM6IFNlbGVjdGFibGVXaXRoSW5kZXg8VD5bXSkge1xuICAgIGlmICghdGhpcy5fbXVsdGlwbGUgJiYgc2VsZWN0cy5sZW5ndGggPiAxICYmICh0eXBlb2YgbmdEZXZNb2RlID09PSAndW5kZWZpbmVkJyB8fCBuZ0Rldk1vZGUpKSB7XG4gICAgICB0aHJvdyBFcnJvcignU2VsZWN0aW9uU2V0OiBub3QgbXVsdGlwbGUgc2VsZWN0aW9uJyk7XG4gICAgfVxuXG4gICAgY29uc3QgYmVmb3JlID0gdGhpcy5fZ2V0Q3VycmVudFNlbGVjdGlvbigpO1xuXG4gICAgaWYgKCF0aGlzLl9tdWx0aXBsZSkge1xuICAgICAgdGhpcy5fc2VsZWN0aW9uTWFwLmNsZWFyKCk7XG4gICAgfVxuXG4gICAgY29uc3QgdG9TZWxlY3Q6IFNlbGVjdGFibGVXaXRoSW5kZXg8VD5bXSA9IFtdO1xuICAgIGZvciAoY29uc3Qgc2VsZWN0IG9mIHNlbGVjdHMpIHtcbiAgICAgIGlmICh0aGlzLmlzU2VsZWN0ZWQoc2VsZWN0KSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgdG9TZWxlY3QucHVzaChzZWxlY3QpO1xuICAgICAgdGhpcy5fbWFya1NlbGVjdGVkKHRoaXMuX2dldFRyYWNrZWRCeVZhbHVlKHNlbGVjdCksIHNlbGVjdCk7XG4gICAgfVxuXG4gICAgY29uc3QgYWZ0ZXIgPSB0aGlzLl9nZXRDdXJyZW50U2VsZWN0aW9uKCk7XG5cbiAgICB0aGlzLmNoYW5nZWQubmV4dCh7YmVmb3JlLCBhZnRlcn0pO1xuICB9XG5cbiAgZGVzZWxlY3QoLi4uc2VsZWN0czogU2VsZWN0YWJsZVdpdGhJbmRleDxUPltdKSB7XG4gICAgaWYgKCF0aGlzLl9tdWx0aXBsZSAmJiBzZWxlY3RzLmxlbmd0aCA+IDEgJiYgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkpIHtcbiAgICAgIHRocm93IEVycm9yKCdTZWxlY3Rpb25TZXQ6IG5vdCBtdWx0aXBsZSBzZWxlY3Rpb24nKTtcbiAgICB9XG5cbiAgICBjb25zdCBiZWZvcmUgPSB0aGlzLl9nZXRDdXJyZW50U2VsZWN0aW9uKCk7XG4gICAgY29uc3QgdG9EZXNlbGVjdDogU2VsZWN0YWJsZVdpdGhJbmRleDxUPltdID0gW107XG5cbiAgICBmb3IgKGNvbnN0IHNlbGVjdCBvZiBzZWxlY3RzKSB7XG4gICAgICBpZiAoIXRoaXMuaXNTZWxlY3RlZChzZWxlY3QpKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICB0b0Rlc2VsZWN0LnB1c2goc2VsZWN0KTtcbiAgICAgIHRoaXMuX21hcmtEZXNlbGVjdGVkKHRoaXMuX2dldFRyYWNrZWRCeVZhbHVlKHNlbGVjdCkpO1xuICAgIH1cblxuICAgIGNvbnN0IGFmdGVyID0gdGhpcy5fZ2V0Q3VycmVudFNlbGVjdGlvbigpO1xuICAgIHRoaXMuY2hhbmdlZC5uZXh0KHtiZWZvcmUsIGFmdGVyfSk7XG4gIH1cblxuICBwcml2YXRlIF9tYXJrU2VsZWN0ZWQoa2V5OiBUfFJldHVyblR5cGU8VHJhY2tCeUZ1bmN0aW9uPFQ+PiwgdG9TZWxlY3Q6IFNlbGVjdGFibGVXaXRoSW5kZXg8VD4pIHtcbiAgICB0aGlzLl9zZWxlY3Rpb25NYXAuc2V0KGtleSwgdG9TZWxlY3QpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbWFya0Rlc2VsZWN0ZWQoa2V5OiBUfFJldHVyblR5cGU8VHJhY2tCeUZ1bmN0aW9uPFQ+Pikge1xuICAgIHRoaXMuX3NlbGVjdGlvbk1hcC5kZWxldGUoa2V5KTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFRyYWNrZWRCeVZhbHVlKHNlbGVjdDogU2VsZWN0YWJsZVdpdGhJbmRleDxUPikge1xuICAgIGlmICghdGhpcy5fdHJhY2tCeUZuKSB7XG4gICAgICByZXR1cm4gc2VsZWN0LnZhbHVlO1xuICAgIH1cblxuICAgIGlmIChzZWxlY3QuaW5kZXggPT0gbnVsbCAmJiAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ1NlbGVjdGlvblNldDogaW5kZXggcmVxdWlyZWQgd2hlbiB0cmFja0J5Rm4gaXMgdXNlZC4nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fdHJhY2tCeUZuKHNlbGVjdC5pbmRleCEsIHNlbGVjdC52YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRDdXJyZW50U2VsZWN0aW9uKCk6IFNlbGVjdGFibGVXaXRoSW5kZXg8VD5bXSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy5fc2VsZWN0aW9uTWFwLnZhbHVlcygpKTtcbiAgfVxufVxuIl19