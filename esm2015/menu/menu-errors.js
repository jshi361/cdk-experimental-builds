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
export function throwExistingMenuStackError() {
    throw Error('CdkMenuPanel is already referenced by different CdkMenuTrigger. Ensure that a menu is' +
        ' opened by a single trigger only.');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1lcnJvcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY2RrLWV4cGVyaW1lbnRhbC9tZW51L21lbnUtZXJyb3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVIOzs7R0FHRztBQUNILE1BQU0sVUFBVSwyQkFBMkI7SUFDekMsTUFBTSxLQUFLLENBQ1QsdUZBQXVGO1FBQ3JGLG1DQUFtQyxDQUN0QyxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG4vKipcbiAqIFRocm93cyBhbiBleGNlcHRpb24gd2hlbiBhIG1lbnUgcGFuZWwgYWxyZWFkeSBoYXMgYSBtZW51IHN0YWNrLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gdGhyb3dFeGlzdGluZ01lbnVTdGFja0Vycm9yKCkge1xuICB0aHJvdyBFcnJvcihcbiAgICAnQ2RrTWVudVBhbmVsIGlzIGFscmVhZHkgcmVmZXJlbmNlZCBieSBkaWZmZXJlbnQgQ2RrTWVudVRyaWdnZXIuIEVuc3VyZSB0aGF0IGEgbWVudSBpcycgK1xuICAgICAgJyBvcGVuZWQgYnkgYSBzaW5nbGUgdHJpZ2dlciBvbmx5LidcbiAgKTtcbn1cbiJdfQ==