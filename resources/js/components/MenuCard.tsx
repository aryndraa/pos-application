import { MdFastfood } from 'react-icons/md';

export default function MenuCard() {
    return (
        <div className="flex flex-col gap-2 rounded-lg bg-white p-4">
            <img
                src="https://images.unsplash.com/photo-1591814252471-068b545dff62?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="w-full rounded-lg"
            />
            <div>
                <div className="mb-4">
                    <h3 className="text-lg font-medium">Katsu Embaltukam</h3>
                    <div className="flex items-center gap-2 text-gray-500">
                        <MdFastfood />
                        <p className="font-medium">Katsu</p>
                    </div>
                </div>
                <div className="mb-2 grid grid-cols-2 border-b border-gray-300 pb-4">
                    <div>
                        <h4 className="text-sm font-medium text-gray-500">
                            Orders
                        </h4>
                        <span className="font-medium">12 Sold</span>
                    </div>
                    <div>
                        <h4 className="text-sm font-medium text-gray-500">
                            Stock
                        </h4>
                        <span className="font-medium">18 Left</span>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                        <p className="font-medium">Price :</p>
                        <span className="font-semibold">Rp. 12.000</span>
                    </div>
                    <button className="flex-1 cursor-pointer rounded-lg bg-secondary py-2 font-semibold">
                        Detail
                    </button>
                </div>
            </div>
        </div>
    );
}
