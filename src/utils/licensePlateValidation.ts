const LICENSE_PLATE_REGEXP = '[A-Z]{3}[0-9][0-9A-Z][0-9]{2}';

export function licensePlateValidate(licensePlate: string) {
    const license = licensePlate.toUpperCase()

    const isValid = license.match(LICENSE_PLATE_REGEXP)

    return isValid
}