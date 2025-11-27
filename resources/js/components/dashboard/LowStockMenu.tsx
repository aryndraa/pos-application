import { Link } from '@inertiajs/react';
import { MdErrorOutline } from 'react-icons/md';

interface LowStockMenuType {
    name: string;
    stock: number;
}

interface LowStockMenuProps {
    lowStockMenu?: LowStockMenuType[];
}

export default function LowStockMenu({ lowStockMenu }: LowStockMenuProps) {
    return (
        <div className="h-full rounded-lg border border-zinc-300 bg-white p-4 md:p-5">
            <div className="mb-4 flex items-center justify-between border-b border-gray-300 pb-4">
                <h3 className="text-lg font-semibold">Low Stock Items</h3>
                <Link className="rounded-lg bg-primary px-4 py-1 text-sm font-medium text-white">
                    View More
                </Link>
            </div>
            <ul className="space-y-2">
                {lowStockMenu && lowStockMenu.length > 0
                    ? lowStockMenu.map((menu, index: number) => (
                          <li
                              key={index}
                              className="flex cursor-pointer items-center justify-between gap-4 rounded-lg px-4 py-2 transition hover:bg-gray-100 md:gap-5"
                          >
                              <div className="flex items-center gap-4 md:gap-5">
                                  <img
                                      src="https://i.pinimg.com/736x/9a/1b/d9/9a1bd93380e781b0f889461689a9330a.jpg"
                                      alt=""
                                      className="size-10 rounded-full object-cover"
                                  />
                                  <div>
                                      <h4 className="font-medium">
                                          {menu.name}
                                      </h4>
                                      <p className="text-xs md:text-sm">
                                          Stock : <span>{menu.stock} Left</span>
                                      </p>
                                  </div>
                              </div>
                              {menu.stock <= 2 && (
                                  <span className="rounded-full text-2xl text-primary">
                                      <MdErrorOutline />
                                  </span>
                              )}
                          </li>
                      ))
                    : 'no data'}
            </ul>
        </div>
    );
}
