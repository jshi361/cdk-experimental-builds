/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { A11yModule } from '@angular/cdk/a11y';
import { Dialog } from './dialog';
import { CdkDialogContainer } from './dialog-container';
import { DIALOG_SCROLL_STRATEGY_PROVIDER } from './dialog-injectors';
import * as i0 from "@angular/core";
export class DialogModule {
}
DialogModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.0.0-next.13", ngImport: i0, type: DialogModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DialogModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "14.0.0-next.13", ngImport: i0, type: DialogModule, declarations: [CdkDialogContainer], imports: [OverlayModule, PortalModule, A11yModule], exports: [
        // Re-export the PortalModule so that people extending the `CdkDialogContainer`
        // don't have to remember to import it or be faced with an unhelpful error.
        PortalModule,
        CdkDialogContainer] });
DialogModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.0.0-next.13", ngImport: i0, type: DialogModule, providers: [Dialog, DIALOG_SCROLL_STRATEGY_PROVIDER], imports: [[OverlayModule, PortalModule, A11yModule], 
        // Re-export the PortalModule so that people extending the `CdkDialogContainer`
        // don't have to remember to import it or be faced with an unhelpful error.
        PortalModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.0.0-next.13", ngImport: i0, type: DialogModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [OverlayModule, PortalModule, A11yModule],
                    exports: [
                        // Re-export the PortalModule so that people extending the `CdkDialogContainer`
                        // don't have to remember to import it or be faced with an unhelpful error.
                        PortalModule,
                        CdkDialogContainer,
                    ],
                    declarations: [CdkDialogContainer],
                    providers: [Dialog, DIALOG_SCROLL_STRATEGY_PROVIDER],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLW1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jZGstZXhwZXJpbWVudGFsL2RpYWxvZy9kaWFsb2ctbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ25ELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDN0MsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUNoQyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUN0RCxPQUFPLEVBQUMsK0JBQStCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQzs7QUFhbkUsTUFBTSxPQUFPLFlBQVk7O2lIQUFaLFlBQVk7a0hBQVosWUFBWSxpQkFIUixrQkFBa0IsYUFQdkIsYUFBYSxFQUFFLFlBQVksRUFBRSxVQUFVO1FBRS9DLCtFQUErRTtRQUMvRSwyRUFBMkU7UUFDM0UsWUFBWTtRQUNaLGtCQUFrQjtrSEFLVCxZQUFZLGFBRlosQ0FBQyxNQUFNLEVBQUUsK0JBQStCLENBQUMsWUFSM0MsQ0FBQyxhQUFhLEVBQUUsWUFBWSxFQUFFLFVBQVUsQ0FBQztRQUVoRCwrRUFBK0U7UUFDL0UsMkVBQTJFO1FBQzNFLFlBQVk7bUdBTUgsWUFBWTtrQkFYeEIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxhQUFhLEVBQUUsWUFBWSxFQUFFLFVBQVUsQ0FBQztvQkFDbEQsT0FBTyxFQUFFO3dCQUNQLCtFQUErRTt3QkFDL0UsMkVBQTJFO3dCQUMzRSxZQUFZO3dCQUNaLGtCQUFrQjtxQkFDbkI7b0JBQ0QsWUFBWSxFQUFFLENBQUMsa0JBQWtCLENBQUM7b0JBQ2xDLFNBQVMsRUFBRSxDQUFDLE1BQU0sRUFBRSwrQkFBK0IsQ0FBQztpQkFDckQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge092ZXJsYXlNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7UG9ydGFsTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7QTExeU1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHtEaWFsb2d9IGZyb20gJy4vZGlhbG9nJztcbmltcG9ydCB7Q2RrRGlhbG9nQ29udGFpbmVyfSBmcm9tICcuL2RpYWxvZy1jb250YWluZXInO1xuaW1wb3J0IHtESUFMT0dfU0NST0xMX1NUUkFURUdZX1BST1ZJREVSfSBmcm9tICcuL2RpYWxvZy1pbmplY3RvcnMnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbT3ZlcmxheU1vZHVsZSwgUG9ydGFsTW9kdWxlLCBBMTF5TW9kdWxlXSxcbiAgZXhwb3J0czogW1xuICAgIC8vIFJlLWV4cG9ydCB0aGUgUG9ydGFsTW9kdWxlIHNvIHRoYXQgcGVvcGxlIGV4dGVuZGluZyB0aGUgYENka0RpYWxvZ0NvbnRhaW5lcmBcbiAgICAvLyBkb24ndCBoYXZlIHRvIHJlbWVtYmVyIHRvIGltcG9ydCBpdCBvciBiZSBmYWNlZCB3aXRoIGFuIHVuaGVscGZ1bCBlcnJvci5cbiAgICBQb3J0YWxNb2R1bGUsXG4gICAgQ2RrRGlhbG9nQ29udGFpbmVyLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtDZGtEaWFsb2dDb250YWluZXJdLFxuICBwcm92aWRlcnM6IFtEaWFsb2csIERJQUxPR19TQ1JPTExfU1RSQVRFR1lfUFJPVklERVJdLFxufSlcbmV4cG9ydCBjbGFzcyBEaWFsb2dNb2R1bGUge31cbiJdfQ==