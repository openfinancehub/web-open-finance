import logo from '@/pages/Store/assets/images/openfinance_light_log.png'
import logoDark from '@/pages/Store/assets/images/openfinance_dark_log.png'

import { useSelector } from 'react-redux'

// ==============================|| LOGO ||============================== //

const Logo = () => {
    const customization = useSelector((state) => state.customization)

    return (
        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
            <img
                style={{ objectFit: 'contain', height: 'auto', width: 180 }}
                src={customization.isDarkMode ? logoDark : logo}
                alt='Openfinance'
            />
        </div>
    )
}

export default Logo
