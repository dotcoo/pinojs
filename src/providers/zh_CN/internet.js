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
  return this.random(this.data.internet_tlds);
}

function domain_name(domain_name = null) {
  return domain_name || this.string(8, 'abcdefghijklmnopqrstuvwxy');
}

function domain_host() {
  return this.random(this.data.internet_hosts);
}

function domain(domain_name = null) {
  return `${this.domain_name(domain_name)}.${this.domain_tld()}`;
}

function hostname(domain_name = null) {
  return `${this.domain_host()}.${this.domain_name(domain_name)}.${this.domain_tld()}`;
}

function free_email_domain() {
  return this.random(this.data.internet_free_email_domains);
}

function free_email() {
  return `${this.name_pinyin()}@${this.random(this.data.internet_free_email_domains)}`;
}

function company_email_domain() {
  return `${this.company_name_pinyin()}.${this.random(this.data.internet_tlds)}`;
}

function company_email() {
  return `${this.name_pinyin()}@${this.company_name_pinyin()}.${this.random(this.data.internet_tlds)}`;
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
  return this.random(this.data.internet_protocols);
}

function site(domain_name = null) {
  return `${this.protocal()}://${this.domain_host()}.${this.domain_name(domain_name)}.${this.domain_tld()}`;
}

function url_path(depth = 2) {
  return '/' + this.range(depth, () => this.random(this.data.internet_url_paths)).join('/');
}

function url_page() {
  return this.random(this.data.internet_url_pages);
}

function url_extension() {
  return this.random(this.data.internet_url_extensions);
}

function url(domain_name = null) {
  return `${this.site(domain_name)}${this.url_path()}/${this.url_page()}.${this.url_extension()}`;
}

export default function(pino) {
  pino.registers({
    // data
    internet_free_email_domains,
    internet_protocols,
    internet_tlds,
    internet_hosts,
    internet_url_paths,
    internet_url_pages,
    internet_url_extensions,
    // method
    domain_tld,
    domain_name,
    domain_host,
    domain,
    hostname,
    free_email_domain,
    free_email,
    company_email_domain,
    company_email,
    email,
    ipv4,
    ipv6,
    mac_address,
    protocal,
    site,
    url_path,
    url_page,
    url_extension,
    url,
  });
};
