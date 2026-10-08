import MenuItemWithTopDescription from '@components/MenuItemWithTopDescription';
import Text from '@components/Text';

import {useMemoizedLazyExpensifyIcons} from '@hooks/useLazyAsset';
import useLocalize from '@hooks/useLocalize';
import useOnyx from '@hooks/useOnyx';
import useStyleUtils from '@hooks/useStyleUtils';
import useThemeStyles from '@hooks/useThemeStyles';

import DistanceRequestUtils from '@libs/DistanceRequestUtils';
import {getEffectiveDistance} from '@libs/GPSDraftDetailsUtils';

import {fontScale} from '@styles/typography';

import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import type {Unit} from '@src/types/onyx/Policy';

type DistanceCounterProps = {
    /** Distance unit of the ongoing GPS trip */
    unit: Unit;
};

function DistanceCounter({unit}: DistanceCounterProps) {
    const styles = useThemeStyles();
    const {translate, preferredLocale} = useLocalize();
    const icons = useMemoizedLazyExpensifyIcons(['Crosshair']);
    const StyleUtils = useStyleUtils();

    const [gpsDraftDetails] = useOnyx(ONYXKEYS.GPS_DRAFT_DETAILS);

    const distance = DistanceRequestUtils.getRoundedDistanceInUnits(getEffectiveDistance(gpsDraftDetails), unit);

    const unitIdentifier = unit === CONST.CUSTOM_UNITS.DISTANCE_UNIT_MILES ? 'mile' : 'kilometer';
    const numberFormatter = new Intl.NumberFormat(preferredLocale, {
        style: 'unit',
        unit: unitIdentifier,
        unitDisplay: 'short',
    });
    const formattedParts = numberFormatter.formatToParts(distance);

    return (
        <MenuItemWithTopDescription
            interactive={false}
            description={translate('common.distance')}
            titleComponent={
                <Text style={[styles.iouAmountTextInput, styles.textXLarge, styles.ml3]}>
                    {formattedParts.map((part, index) => {
                        const isValuePart = ['integer', 'decimal', 'fraction', 'group'].includes(part.type);
                        return (
                            <Text
                                key={`${part.type}-${index}`}
                                style={isValuePart ? [styles.iouAmountTextInput, styles.textXLarge] : [styles.iouAmountTextInput, styles.textXLarge, styles.colorMuted]}
                            >
                                {part.value}
                            </Text>
                        );
                    })}
                </Text>
            }
            style={[styles.ph0]}
            icon={icons.Crosshair}
            shouldIconUseAutoWidthStyle
            descriptionTextStyle={StyleUtils.getFontSizeStyle(fontScale.label)}
        />
    );
}

export default DistanceCounter;
