import styled from 'styled-components';
import { Card } from 'semantic-ui-react';

export const StyledCard = styled(Card)`
    &&&& { 
        min-height: 200px;
        padding: 1em;
        margin-bottom: 2em;
        border-radius: 20px;
        -webkit-box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.24);
        -moz-box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.24);
        box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.24);
        i {
            float: right;
        }
        button {
            border-radius: 20px;
        }
    }
`