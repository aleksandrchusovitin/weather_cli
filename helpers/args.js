export default (args) => {
  const [_executer, _file, ...parameters] = args;

  return parameters.reduce((acc, parameter, index) => {
    const lastIndex = parameters.length - 1;
    const isParameterStartWithHyphen = (parameter) => parameter.startsWith('-');
    const nextParameter = parameters[index + 1];
    const parameterWithoutHyphen = parameter.slice(1);

    if (isParameterStartWithHyphen(parameter)) {
      if (index === lastIndex) {
        return { ...acc, [parameterWithoutHyphen]: true };
      } else if (!isParameterStartWithHyphen(nextParameter)) {
        return { ...acc, [parameterWithoutHyphen]: nextParameter };
      } else {
        return { ...acc, [parameterWithoutHyphen]: true };
      }
    }
    return acc;
  }, {});
};
