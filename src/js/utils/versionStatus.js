// Article: http://goo.gl/K7hYWj
export function parseVersionString(str) {
  if (typeof str !== 'string') {
    return false;
  }
  var x = str.split('.');
  // parse from string or default to 0 if can't parse
  var maj = parseInt(x[0], 10) || 0;
  var min = parseInt(x[1], 10) || 0;
  var pat = parseInt(x[2], 10) || 0;

  return {
    major: maj,
    minor: min,
    patch: pat,
  };
}

export function compareVersionNumbers(v1, v2) {
  var running_version = parseVersionString(v1.replace(/[^0-9.]/g, ''));
  var latest_version = parseVersionString(v2);
  if (running_version.major < latest_version.major) {
    // A major new update is available!
    return -1;
  } else if (
    running_version.minor < latest_version.minor ||
    running_version.patch < latest_version.patch
  ) {
    // A new minor or patch update is available.
    return 0;
  } else {
    // We are running the latest version! No need to update.
    return 1;
  }
}

export function getStatus(status) {
  let isMajor = false;
  let isMinor = false;
  let isUpToDate = false;

  if (status === -1) {
    // A major new update is available!
    isMajor = true;
  } else if (status === 0) {
    // A new minor or patch update is available.
    isMinor = true;
  } else {
    isUpToDate = true;
  }

  return {
    isMajor,
    isMinor,
    isUpToDate,
  };
}
