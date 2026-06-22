import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Image, ImageSourcePropType } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface AppHeaderProps {
  title: string;
  leftIcon?: string;
  leftIconColor?: string;
  onLeftPress?: () => void;
  leftLogo?: ImageSourcePropType;
  onLeftLogoPress?: () => void;
  rightIcon?: string;
  rightIconColor?: string;
  onRightPress?: () => void;
  rightIcon2?: string;
  rightIconColor2?: string;
  onRightPress2?: () => void;
  rightLogo?: ImageSourcePropType;
  onRightLogoPress?: () => void;
  subtitle?: string;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  leftIcon,
  leftIconColor = '#007AFF',
  onLeftPress,
  leftLogo,
  onLeftLogoPress,
  rightIcon,
  rightIconColor = '#007AFF',
  onRightPress,
  rightIcon2,
  rightIconColor2 = '#007AFF',
  onRightPress2,
  rightLogo,
  onRightLogoPress,
  subtitle,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 8) }]}>
      {/* Left Icon / Logo / Back Button */}
      <View style={styles.leftContainer}>
        {leftLogo && onLeftLogoPress ? (
          <TouchableOpacity onPress={onLeftLogoPress} style={styles.logoButton}>
            <Image source={leftLogo} style={styles.logo} resizeMode="contain" />
          </TouchableOpacity>
        ) : leftIcon && onLeftPress ? (
          <TouchableOpacity onPress={onLeftPress} style={styles.iconButton}>
            <Icon name={leftIcon} size={24} color={leftIconColor} />
          </TouchableOpacity>
        ) : (
          <View style={styles.iconPlaceholder} />
        )}
      </View>

      {/* Center - Title and Subtitle */}
      <View style={styles.centerContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {subtitle && (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>

      {/* Right Icons / Logo */}
      <View style={styles.rightContainer}>
        {rightLogo && onRightLogoPress ? (
          <TouchableOpacity onPress={onRightLogoPress} style={styles.logoButton}>
            <Image source={rightLogo} style={styles.logo} resizeMode="contain" />
          </TouchableOpacity>
        ) : (
          <>
            {rightIcon2 && onRightPress2 && (
              <TouchableOpacity onPress={onRightPress2} style={styles.iconButton}>
                <Icon name={rightIcon2} size={24} color={rightIconColor2} />
              </TouchableOpacity>
            )}
            {rightIcon && onRightPress ? (
              <TouchableOpacity onPress={onRightPress} style={styles.iconButton}>
                <Icon name={rightIcon} size={24} color={rightIconColor} />
              </TouchableOpacity>
            ) : (
              rightIcon && <View style={styles.iconPlaceholder} />
            )}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: Platform.OS === 'ios' ? 0.5 : 1,
    borderBottomColor: '#C7C7CC',
    elevation: Platform.OS === 'android' ? 2 : 0,
    shadowColor: Platform.OS === 'ios' ? '#000' : 'transparent',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  leftContainer: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  subtitle: {
    fontSize: 11,
    fontWeight: '400',
    color: '#666',
    marginTop: 1,
  },
  rightContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 4,
  },
  iconButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 36,
    height: 36,
  },
  iconPlaceholder: {
    width: 44,
    height: 44,
  },
});

export default AppHeader;
