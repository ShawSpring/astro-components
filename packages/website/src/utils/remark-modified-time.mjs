import { statSync } from "node:fs";
import { execSync } from "node:child_process";
//! dayjs 有bug， 使用moment
import moment from "moment-timezone";
export function remarkModifiedTime() {
	return (tree, file) => {
		const filepath = file.history[0];
		const result = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`);
		// const result = statSync(filepath); // 文件信息
		file.data.astro.frontmatter.lastModified = moment(result.mtime)
			.tz("Asia/Shanghai")
			.format("YYYY-MM-DD HH:mm Z");
	};
}
