/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AfterContentInit, ElementRef, EventEmitter, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FocusOrigin } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { CdkMenuGroup } from './menu-group';
import { Menu } from './menu-interface';
import { MenuStack } from './menu-stack';
import { MenuAim } from './menu-aim';
import { MenuTrigger } from './menu-trigger';
import * as i0 from "@angular/core";
/**
 * Directive which configures the element as a Menu which should contain child elements marked as
 * CdkMenuItem or CdkMenuGroup. Sets the appropriate role and aria-attributes for a menu and
 * contains accessible keyboard and mouse handling logic.
 *
 * It also acts as a RadioGroup for elements marked with role `menuitemradio`.
 */
export declare class CdkMenu extends CdkMenuGroup implements Menu, AfterContentInit, OnInit, OnDestroy {
    private readonly _ngZone;
    readonly _elementRef: ElementRef<HTMLElement>;
    readonly _menuStack?: MenuStack | undefined;
    private _parentTrigger?;
    private readonly _menuAim?;
    private readonly _dir?;
    /**
     * Sets the aria-orientation attribute and determines where menus will be opened.
     * Does not affect styling/layout.
     */
    orientation: 'horizontal' | 'vertical';
    /** Event emitted when the menu is closed. */
    readonly closed: EventEmitter<void | 'click' | 'tab' | 'escape'>;
    /** Handles keyboard events for the menu. */
    private _keyManager;
    /** Manages items under mouse focus. */
    private _pointerTracker?;
    /** List of nested CdkMenuGroup elements */
    private readonly _nestedGroups;
    /** All child MenuItem elements nested in this Menu. */
    private readonly _allItems;
    /** The Menu Item which triggered the open submenu. */
    private _openItem?;
    constructor(_ngZone: NgZone, _elementRef: ElementRef<HTMLElement>, _menuStack?: MenuStack | undefined, _parentTrigger?: MenuTrigger | undefined, _menuAim?: MenuAim | undefined, _dir?: Directionality | undefined);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    /** Place focus on the first MenuItem in the menu and set the focus origin. */
    focusFirstItem(focusOrigin?: FocusOrigin): void;
    /** Place focus on the last MenuItem in the menu and set the focus origin. */
    focusLastItem(focusOrigin?: FocusOrigin): void;
    /** Handle keyboard events for the Menu. */
    _handleKeyEvent(event: KeyboardEvent): void;
    /**
     * Complete the change emitter if there are any nested MenuGroups or register to complete the
     * change emitter if a MenuGroup is rendered at some point
     */
    private _completeChangeEmitter;
    /** Return true if there are nested CdkMenuGroup elements within the Menu */
    private _hasNestedGroups;
    /** Setup the FocusKeyManager with the correct orientation for the menu. */
    private _setKeyManager;
    /**
     * Set the PointerFocusTracker and ensure that when mouse focus changes the key manager is updated
     * with the latest menu item under mouse focus.
     */
    private _subscribeToMouseManager;
    /** Subscribe to the MenuStack close and empty observables. */
    private _subscribeToMenuStack;
    /**
     * Close the open menu if the current active item opened the requested MenuStackItem.
     * @param item the MenuStackItem requested to be closed.
     */
    private _closeOpenMenu;
    /** Set focus the either the current, previous or next item based on the FocusNext event. */
    private _toggleMenuFocus;
    /**
     * Subscribe to the menu trigger's open events in order to track the trigger which opened the menu
     * and stop tracking it when the menu is closed.
     */
    private _subscribeToMenuOpen;
    /** Return true if this menu has been configured in a horizontal orientation. */
    private _isHorizontal;
    /**
     * Return true if this menu is an inline menu. That is, it does not exist in a pop-up and is
     * always visible in the dom.
     */
    _isInline(): boolean;
    ngOnDestroy(): void;
    /** Emit and complete the closed event emitter */
    private _emitClosedEvent;
    static ɵfac: i0.ɵɵFactoryDeclaration<CdkMenu, [null, null, { optional: true; }, { optional: true; }, { optional: true; self: true; }, { optional: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<CdkMenu, "[cdkMenu]", ["cdkMenu"], { "orientation": "cdkMenuOrientation"; }, { "closed": "closed"; }, ["_nestedGroups", "_allItems"]>;
}
