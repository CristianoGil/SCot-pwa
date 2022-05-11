import React from 'react';
import {Page, Text, View, Document, StyleSheet} from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});

interface IProps {
    data?: any
}

// Create Document Component
const CODirecta_PDFDocument: React.FC<IProps> = (props) => (

    // @ts-ignore
    <Document>
        {/*// @ts-ignore*/}
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text>Section #1</Text>
            </View>
            <View style={styles.section}>
                <Text>Section #2</Text>
            </View>
        </Page>
    </Document>

);

export default CODirecta_PDFDocument
