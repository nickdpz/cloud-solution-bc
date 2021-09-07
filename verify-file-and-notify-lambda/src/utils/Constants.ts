export const HTTP_CODES = {
	OK: 200,
	ERROR_INTERNAL: 500,
};

export const CONSTANTS = {
	LOG_LEVEL: "debug",
	TIMEZONE: "America/Bogota",
	BUCKET_NAME: "bc-test-default-main-bucket",
	SECONDS_OF_MINUTE: 60,
	FILE_DOWNLOAD_NAME:"/tmp/download.csv",
	FOLDER_STORAGE: "response/",
};

export const TYPES = {
	MainPresenter: Symbol.for("MainPresenter"),
	MainService: Symbol.for("MainService"),
	MainController: Symbol.for("MainController"),
	Logger: Symbol.for("Logger"),
	StorageAdapter: Symbol.for("StorageAdapter"),
	FilesAdapter: Symbol.for("FilesAdapter"),
};
