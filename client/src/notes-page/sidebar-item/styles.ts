import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    listItem: {
        cursor: 'pointer'
    },
    textSection: {
        width: '85%',
    },
    deleteIcon: {
        position: 'absolute',
        right: '5px',
        top: 'calc(50% - 15px)',
        '&:hover': {
            color: 'red'
        }
    }
}));

export default useStyles;