<?php
return [
  'paths' => ['api/*'],
  'allowed_methods' => ['*'],
  'allowed_origins' => ['http://127.0.0.1:3000','http://localhost:3000'],
  'allowed_headers' => ['*'],
  'supports_credentials' => false, // False for token-based auth
];
