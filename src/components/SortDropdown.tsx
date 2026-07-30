import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Menu } from 'react-native-paper';

interface SortOption<T extends string> {
  value: T;
  label: string;
}

interface SortDropdownProps<T extends string> {
  options: SortOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

export function SortDropdown<T extends string>({
  options,
  value,
  onChange,
}: SortDropdownProps<T>) {
  const [visible, setVisible] = useState(false);
  const current = options.find((o) => o.value === value);

  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchor={
        <Button mode="outlined" onPress={() => setVisible(true)} style={styles.button}>
          Sort: {current?.label ?? ''}
        </Button>
      }
    >
      {options.map((option) => (
        <Menu.Item
          key={option.value}
          onPress={() => {
            onChange(option.value);
            setVisible(false);
          }}
          title={option.label}
        />
      ))}
    </Menu>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
  },
});
