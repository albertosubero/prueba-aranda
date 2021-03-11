import styled from 'styled-components';
import { Input } from 'semantic-ui-react';

export const StyledInput = styled(Input)`
    &&&& {
        height: 50px;
        margin-bottom: .5em;
        input {
            border-radius: 20px !important;
            border: none !important;
        }
    }
`