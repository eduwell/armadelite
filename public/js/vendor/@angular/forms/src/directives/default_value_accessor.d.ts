/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
<<<<<<< Updated upstream
import { ElementRef, InjectionToken, Renderer2 } from '@angular/core';
=======
import { ElementRef, InjectionToken, Renderer } from '@angular/core';
>>>>>>> Stashed changes
import { ControlValueAccessor } from './control_value_accessor';
export declare const DEFAULT_VALUE_ACCESSOR: any;
/**
 * Turn this mode on if you want form directives to buffer IME input until compositionend
 * @experimental
 */
export declare const COMPOSITION_BUFFER_MODE: InjectionToken<boolean>;
/**
 * The default accessor for writing a value and listening to changes that is used by the
 * {@link NgModel}, {@link FormControlDirective}, and {@link FormControlName} directives.
 *
 *  ### Example
 *  ```
 *  <input type="text" name="searchQuery" ngModel>
 *  ```
 *
 *  @stable
 */
export declare class DefaultValueAccessor implements ControlValueAccessor {
    private _renderer;
    private _elementRef;
    private _compositionMode;
    onChange: (_: any) => void;
    onTouched: () => void;
    /** Whether the user is creating a composition string (IME events). */
    private _composing;
<<<<<<< Updated upstream
    constructor(_renderer: Renderer2, _elementRef: ElementRef, _compositionMode: boolean);
=======
    constructor(_renderer: Renderer, _elementRef: ElementRef, _compositionMode: boolean);
>>>>>>> Stashed changes
    writeValue(value: any): void;
    registerOnChange(fn: (_: any) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    _handleInput(value: any): void;
    _compositionStart(): void;
    _compositionEnd(value: any): void;
}
