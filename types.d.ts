declare module '@vercel/postgres';

declare module 'clsx' {
	type ClassValue = string | number | ClassDictionary | ClassArray | undefined | null | boolean;

	interface ClassDictionary {
		[ id: string ]: any;
	}

	interface ClassArray extends Array<ClassValue> {
	}

	type ClassNamesFn = (...classes: ClassValue[]) => string;

	type ClassNamesExport = ClassNamesFn & { default: ClassNamesFn };

	const classNames: ClassNamesExport;

	export = classNames;
}