import { icons, type IconProps } from '@tabler/icons-react';

interface TablerIconProps extends IconProps {
  iconName: keyof typeof icons;
}

export function TablerIcon({
  iconName,
  title,
  size = 16,
  stroke = 2,
  ...props
}: TablerIconProps) {
  const Icon = icons[iconName];
  return <Icon stroke={stroke} size={size} title={title} {...props} />;
}
