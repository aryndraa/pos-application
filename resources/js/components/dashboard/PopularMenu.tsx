import { Link } from '@inertiajs/react';

interface PopularMenuType {
    name: string;
    total_sold: number;
}

interface PopularMenuProps {
    popularMenu?: PopularMenuType[];
}

export default function PopularMenu({ popularMenu }: PopularMenuProps) {
    let numbering = 1;

    return (
        <div className="rounded-lg bg-white p-4 md:p-5">
            <div className="mb-4 flex items-center justify-between border-b border-gray-300 pb-4">
                <h3 className="text-lg font-semibold">Popular Menu</h3>
                <Link className="rounded-lg bg-secondary px-4 py-1 text-sm font-medium">
                    View More
                </Link>
            </div>
            <ul className="space-y-2">
                {popularMenu && popularMenu.length > 0
                    ? popularMenu.map((menu, index: number) => (
                          <li
                              key={index}
                              className="flex cursor-pointer items-center gap-4 rounded-lg px-4 py-2 transition hover:bg-gray-100 md:gap-5"
                          >
                              <span className="text-xl font-semibold">
                                  {numbering++}
                              </span>
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
                                          Orders :{' '}
                                          <span>{menu.total_sold}</span>
                                      </p>
                                  </div>
                              </div>
                          </li>
                      ))
                    : 'no data'}
            </ul>
        </div>
    );
}
