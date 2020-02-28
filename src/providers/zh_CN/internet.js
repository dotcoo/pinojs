const internet_free_email_domains = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com',
  '163.com', '126.com', 'yeah.net', 'qq.com', 'foxmail.com',
  'sina.com.cn', 'sohu.com', 
];

const internet_protocols = [
  'http', 'https',
];

const internet_tlds = [
  'com', 'net', 'cn', 'com.cn', 'net.cn',
];

const internet_hosts = [
  'www', 'www', 'www', 'www', 'oa', 'mail', 'email', 'disk', 'im', 'data', 'file',
];

const internet_url_paths = [
  'app', 'main', 'wp-content', 'search', 'category', 'tag', 'categories',
  'tags', 'blog', 'posts', 'list', 'explore',
];

const internet_url_pages = [
  'index', 'home', 'search', 'main', 'post', 'homepage', 'category',
  'register', 'login', 'faq', 'about', 'terms', 'privacy', 'author',
];

const internet_url_extensions = [
  'html', 'htm', 'php', 'jsp', 'asp',
];

function domain_tld() {
  return this.pick(internet_tlds);
}

function domain_name(domain_name = null) {
  return domain_name || this.string({ len: 8, chars: 'abcdefghijklmnopqrstuvwxy' });
}

function domain_host() {
  return this.pick(internet_hosts);;
}

function domain(domain_name = null) {
  return `${this.domain_name(domain_name)}.${this.domain_tld()}`;
}

function hostname(domain_name = null) {
  return `${this.domain_host()}.${this.domain_name(domain_name)}.${this.domain_tld()}`;
}

function free_email_domain() {
  return this.pick(internet_free_email_domains);
}

function free_email() {
  return `${this.name_pinyin()}@${this.pick(internet_free_email_domains)}`;
}

function company_email_domain() {
  return `${this.company_name_pinyin()}.${this.pick(internet_tlds)}`;
}

function company_email() {
  return `${this.name_pinyin()}@${this.company_name_pinyin()}.${this.pick(internet_tlds)}`;
}

function email() {
  return this.free_email();
}

function ipv4() {
  return this.range(4, this.uint8).join('.');
}

function ipv6() {
  return this.range(8, this.uint16).map(v => v.toString(16)).join(':');
}

function mac_address() {
  return this.range(6, this.uint8).map(v => v.toString(16).padStart(2, 0)).join(':');
}

function protocal() {
  return this.pick(internet_protocols);
}

function site(domain_name = null) {
  return `${this.protocal()}://${this.domain_host()}.${this.domain_name(domain_name)}.${this.domain_tld()}`;
}

function url_path(depth = 2) {
  return '/' + this.range(depth, () => this.pick(internet_url_paths)).join('/');
}

function url_page() {
  return this.pick(internet_url_pages);
}

function url_extension() {
  return this.pick(internet_url_extensions);
}

function url(domain_name = null) {
  return `${this.site(domain_name)}${this.url_path()}/${this.url_page()}.${this.url_extension()}`;
}

module.exports = function(pino) {
  pino.register('domain_tld', domain_tld);
  pino.register('domain_name', domain_name);
  pino.register('domain_host', domain_host);
  pino.register('domain', domain);
  pino.register('hostname', hostname);
  pino.register('free_email_domain', free_email_domain);
  pino.register('free_email', free_email);
  pino.register('company_email_domain', company_email_domain);
  pino.register('company_email', company_email);
  pino.register('email', email);
  pino.register('ipv4', ipv4);
  pino.register('ipv6', ipv6);
  pino.register('mac_address', mac_address);
  pino.register('protocal', protocal);
  pino.register('site', site);
  pino.register('url_path', url_path);
  pino.register('url_page', url_page);
  pino.register('url_extension', url_extension);
  pino.register('url', url);
};
