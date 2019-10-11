import { Locale } from 'vant';
import enUS from 'vant/lib/locale/lang/en-US';
import zhCN from 'vant/lib/locale/lang/zh-CN';
export function Locals(a) {
    if (a == 'en') {
        Locale.use('en', enUS);
    } else if (a == 'zhCHS') {
        Locale.use(a, zhCN);
    }
}
