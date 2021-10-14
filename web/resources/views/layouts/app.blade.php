<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="icon" href="{{ asset('favicon.ico') }}" />

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'MDICS') }}</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">

    <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,600,700&display=swap" rel="stylesheet" />

</head>

<body>
    <noscript>If you're seeing this message, that means
        <strong>JavaScript has been disabled on your browser</strong>, please
        <strong>enable JS</strong> to make this app work.
    </noscript>
    <div id="app">
    </div>

    <script src="{{ mix('app/app.js') }}"></script>
</body>

</html>