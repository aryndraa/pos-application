import { FaPlus } from 'react-icons/fa';
import DropdownFilter from '../DropdownFilter';
import Search from '../Search';
import CategoryFIlter from './CategoryFIlter';
import ListMenu from './ListMenu';

export default function Menu() {
    return (
        <div>
            <div className="gap-4 lg:grid lg:grid-cols-12">
                <div className="mb-4 lg:col-span-2 lg:mb-0">
                    <CategoryFIlter />
                </div>
                <div className="lg:col-span-10">
                    <div className="mb-4 flex flex-col items-center justify-between gap-4 lg:flex-row">
                        <div className="flex w-full items-stretch gap-2 lg:w-fit lg:gap-4">
                            <div className="w-full lg:w-96">
                                <Search />
                            </div>

                            <DropdownFilter />
                        </div>

                        <div className="w-full lg:w-fit">
                            <button className="flex w-full cursor-pointer items-center justify-center gap-4 rounded-lg bg-secondary px-4 py-3 font-semibold lg:w-fit">
                                New Menu
                                <FaPlus />
                            </button>
                        </div>
                    </div>
                    <ListMenu />
                </div>
            </div>
        </div>
    );
}
