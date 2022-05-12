import {CoDirectaMarkupTable1} from './helpers/CoDirectaMarkupTable1';
import {CoDirectaMarkupTable2} from './helpers/CoDirectaMarkupTable2';
import {CoDirectaMarkupTable3} from './helpers/CoDirectaMarkupTable3';


export const CoDirectaTemplateMarkup = () => (
    <table width="100%" cellPadding={0} cellSpacing={0} id={"htmlWrapperForPDF"}>
        <tbody>
        <tr>
            <td width="50%">&nbsp;</td>
            <td align="center">
                <CoDirectaMarkupTable1/>
                <br/>
                <br/>
                <CoDirectaMarkupTable2/>
                <br/>
                <br/>
                <CoDirectaMarkupTable3/>
            </td>
            <td width="50%">&nbsp;</td>
        </tr>
        </tbody>
    </table>
)
