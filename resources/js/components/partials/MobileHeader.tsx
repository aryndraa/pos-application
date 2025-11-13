import HeaderLogo from '../HeaderLogo';
import LogoutButton from '../actions/LogoutButton';

export default function MobileHeader() {
    return (
        <div className="flex items-center justify-between p-4 pt-6 pb-2 md:hidden">
            <HeaderLogo />
            <LogoutButton />
        </div>
    );
}
