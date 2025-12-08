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
                'voucher_code' => 'nullable|string',
                'payment_method' => 'required',
                'pay' => 'nullable|numeric|min:0',
                'service_type' => 'required',
                'items' => 'required|array|min:1',
                'items.*.menu_id' => 'required|exists:menus,id',
                'items.*.quantity' => 'required|integer|min:1',
                'items.*.unit_price' => 'required|numeric|min:0',
                'items.*.subtotal' => 'required|numeric|min:0',
                'items.*.notes' => 'nullable|string',
                'items.*.additionals' => 'nullable|array',
                'items.*.additionals.*.additional_item_id' => 'required|exists:additional_items,id',
                'items.*.additionals.*.quantity' => 'required|integer|min:1',
                'items.*.additionals.*.unit_price' => 'required|numeric|min:0',
            ];
    }
}
