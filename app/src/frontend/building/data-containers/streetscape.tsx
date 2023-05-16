import React, { Fragment } from 'react';
import InfoBox from '../../components/info-box';
import { dataFields } from '../../config/data-fields-config';
import DataEntry from '../data-components/data-entry';
import NumericDataEntry from '../data-components/numeric-data-entry';

import withCopyEdit from '../data-container';

import { CategoryViewProps } from './category-view-props';
import { DataEntryGroup } from '../data-components/data-entry-group';

/**
* Streetscape view/edit section
*/
const StreetscapeView: React.FunctionComponent<CategoryViewProps> = (props) => (
    <Fragment>
        <DataEntryGroup name="Does the building have a garden(s)?">
            <DataEntry
                title="Does the building have a front garden?"
                slug=""
                value=""
                mode='view'
            />
            <DataEntry
                title="Does the building have a back garden?"
                slug=""
                value=""
                mode='view'
            />
        </DataEntryGroup>
        <DataEntryGroup name="Street/pavement properties">
            <DataEntry
                title="Street width"
                slug=""
                value=""
                mode='view'
            />
            <DataEntry
                title="Pavement width"
                slug=""
                value=""
                mode='view'
            />
            <DataEntry
                title="Street network geometry link"
                slug=""
                value=""
                mode='view'
            />
        </DataEntryGroup>
        <DataEntryGroup name="Access to green space">
            <DataEntry
                title="Distance from public green space"
                slug=""
                value=""
                mode='view'
            />
            <DataEntry
                title="Distance from front door to nearest tree"
                slug=""
                value=""
                mode='view'
            />
        </DataEntryGroup>
    </Fragment>
);
const StreetscapeContainer = withCopyEdit(StreetscapeView);

export default StreetscapeContainer;
