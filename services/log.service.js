import chalk from 'chalk';
import dedent from 'dedent-js';

export const printError = (error) => {
  console.log(chalk.bgRed(` ERROR ${error}`));
};

export const printSuccess = (message) => {
  console.log(chalk.bgGreen(` SUCCESS ${message}`));
};

export const printHelp = () => {
  console.log(
    dedent(`${chalk.bgCyan(' HELP ')}
    Without parameters - show weather
    -c [CITY] set city
    -h show help
    -t [API_KEY] save token
    `)
  );
};

export const printWeather = (response, icon) => {
  console.log(
    dedent(`${chalk.bgYellow(' WEATHER ')} Weather in the city of ${
      response.name
    }
    ${icon}  ${response.weather.at(0).description}
    Temperature: ${response.main.temp} (feels like ${response.main.feels_like})
    Humidity: ${response.main.humidity}%
    Wind speed: ${response.wind.speed}
    `)
  );
};
