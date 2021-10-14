const getColorTheme = (prop, theme) => {
  let color = theme.colorDefault;

  if (prop.primary) {
    color = theme.colorPrimary;
  } else if (prop.info) {
    color = theme.colorInfo;
  } else if (prop.danger) {
    color = theme.colorDanger;
  } else if (prop.success) {
    color = theme.colorSuccess;
  }

  return color;
};

const getBorderRadius = (prop, theme) => {
  let borderRadius = theme.borderRadiusDefault;

  if (prop.round) {
    borderRadius = theme.borderRadiusRound;
  } else if (prop.circle) {
    borderRadius = theme.borderRadiusCircle;
  }

  return borderRadius;
};

export { getColorTheme, getBorderRadius };
