#!/usr/bin/env node
import getArgs from './helpers/args.js';
import { getWeather, getIcon } from './services/api.service.js';
import {
  printHelp,
  printSuccess,
  printError,
  printWeather,
} from './services/log.service.js';
import {
  saveKeyValue,
  TOKEN_DICTIONARY,
  getKeyValue,
} from './services/storage.service.js';

const saveToken = async (token) => {
  if (!token.length) {
    printError('Token was not transferred');
    return;
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess('Token has been saved');
  } catch (err) {
    printError(err.message);
  }
};

const saveCity = async (city) => {
  if (!city.length) {
    printError('City was not transferred');
    return;
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess('City has been saved');
  } catch (err) {
    printError(err.message);
  }
};

const getForcast = async () => {
  try {
    const city = process.env.CITY ?? (await getKeyValue(TOKEN_DICTIONARY.city));
    if (!city) {
      throw new Error('City is not defined. Set it with command: -c [CITY]');
    }
    const weather = await getWeather(city);
    printWeather(weather, getIcon(weather.weather.at(0).icon));
  } catch (err) {
    if (err?.response?.status === 404) {
      printError('Incorrect city');
    } else if (err?.response?.status === 401) {
      printError('Incorrect token');
    } else {
      printError(err.message);
    }
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);

  if (args.h) {
    return printHelp();
  }

  if (args.c) {
    return saveCity(args.c);
  }

  if (args.t) {
    return saveToken(args.t);
  }
  return getForcast();
};

initCLI();
