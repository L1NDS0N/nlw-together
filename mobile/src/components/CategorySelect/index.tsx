import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { styles } from './styles';
import { categories } from '../../utils/categories';
import { Category } from '../Category';

type Props = {
  categorySelected: string;
  onChangeCategory: (categoryId: string) => void;
  hasCheckBox?: boolean;
};

export function CategorySelect({
  categorySelected,
  onChangeCategory,
  hasCheckBox = false ,
}: Props) {
  return (
    <ScrollView
      horizontal
      style={styles.container}
      showsHorizontalScrollIndicator
      contentContainerStyle={{ paddingRight: 40 }}
    >
      {categories.map(category => (
        <Category
          key={category.id}
          title={category.title}
          icon={category.icon}
          checked={category.id === categorySelected}
          hasCheckBox={hasCheckBox}
          onPress={() => onChangeCategory(category.id)}
        />
      ))}
    </ScrollView>
  );
}
