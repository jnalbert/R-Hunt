import React, { FC } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { colors } from "../../constants/shared.colors";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.background,
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: 0,
    marginVertical: 20,
  },
  background: {
    flex: 1,
    backgroundColor: colors.background,
  },
})

interface ScreenWrapperCompProps {
  children: React.ReactNode;
  scrollView?: boolean;
  refreshControl?: any;
  noMargin?: boolean;
  backgroundColor?: string;
}

const ScreenWrapperComp: FC<ScreenWrapperCompProps> = ({
  children,
  scrollView,
  refreshControl,
  noMargin,
  backgroundColor
}) => {

  const noMarginStyle = noMargin ? {marginLeft: 0, marginRight: 0} : {};
  const backgroundColorStyle = backgroundColor ? {backgroundColor: backgroundColor} : {};

  return (

    <View style={[backgroundColorStyle, styles.background]}>
      <>
          {scrollView ? (
            <ScrollView refreshControl={refreshControl}>
              <View style={[noMarginStyle, backgroundColorStyle, styles.wrapper]}>{children}</View>
            </ScrollView>
          ) : (
            <View style={[noMarginStyle, backgroundColorStyle, styles.wrapper]}>{children}</View>
          )}
      </>
      
     
    </View>
  );
};

export default ScreenWrapperComp;