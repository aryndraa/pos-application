<?php

namespace App\Http\Requests\Order;

use Illuminate\Foundation\Http\FormRequest;

class OrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'customer_name' => 'required|string|max:255',
            'payment_method' => 'required|string|max:50',
            'pay' => 'required|integer|min:0',
            'items' => 'required|array|min:1',
            'items.*.menu_id' => 'required|integer|exists:menus,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_price' => 'required|integer|min:0',
            'items.*.subtotal' => 'required|integer|min:0',
            'items.*.notes' => 'nullable|string',
            'items.*.additionals' => 'nullable|array',
            'items.*.additionals.*.additional_item_id' => 'required|integer|exists:additional_items,id',
            'items.*.additionals.*.quantity' => 'required|integer|min:1',
            'items.*.additionals.*.unit_price' => 'required|integer|min:0',
        ];
    }
}
