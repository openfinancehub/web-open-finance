import { Link } from 'react-router-dom'

// material-ui
import { ButtonBase } from '@mui/material'

// project imports
import config from '@/pages/Store/config'
import Logo from '@/components//extended/Logo'

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
    <ButtonBase disableRipple component={Link} to={config.homePath}>
        <Logo />
    </ButtonBase>
)

export default LogoSection
