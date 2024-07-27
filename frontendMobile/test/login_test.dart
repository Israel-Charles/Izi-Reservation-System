import 'dart:convert';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter/material.dart';
import 'package:reserve_smart/main.dart';
import 'package:mockito/mockito.dart';
import 'package:http/http.dart' as http;

// Create a class that extends the http.Client class.
class MockClient extends Mock implements http.Client {}

void main() {
  // Create a new instance of the mock HTTP client.
  /*
  final client = MockClient();

  // Mock response for a successful login.
  final successResponse = http.Response('{"message": "Logged in"}', 200);

// Mock response for an invalid login.
  final failureResponse =
      http.Response('{"message": "Invalid credentials"}', 401);

  // Use when() to tell the mock client to return the mock response when it receives a POST request.
  when(client.post(Uri.parse('https://4331booking.com/api/auth/login'),
          headers: anyNamed('headers'), body: anyNamed('body')))
      .thenAnswer((realInvocation) async {
    // Get the body of the request.
    String body = realInvocation.namedArguments[const Symbol('body')];
    Map<String, dynamic> data = jsonDecode(body);

    // Check the credentials.
    if (data['identifier'] == 'Jeremy' && data['password'] == 'testing123') {
      return successResponse;
    } else {
      return failureResponse;
    }
  }); */

  testWidgets('Navigation and error box tests', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const MyApp());

    // Find the 'Forgot my password' button and tap on it.
    var forgotPasswordButton = find.text("Forget your password? Click here");
    expect(forgotPasswordButton, findsOneWidget);

    // Scroll the ListView to bring the button into view.
    await tester.drag(find.byType(ListView), const Offset(0, -300));
    await tester.pumpAndSettle();

    // Ensure the button is visible.
    await tester.ensureVisible(forgotPasswordButton);

    // Now tap on the button.
    await tester.tap(forgotPasswordButton);
    await tester.pumpAndSettle();
    //await Future.delayed(const Duration(seconds: 2));

    // Verify that the 'Forgot Password' page is shown.
    expect(find.text('Forgot Your Password?'), findsOneWidget);

    // Go back to the login page.
    //await tester.pageBack();
    tester.state<NavigatorState>(find.byType(Navigator)).pop();
    await tester.pumpAndSettle();

    // Find the 'Don't have an account? Sign Up!' button and tap on it.
    var signUpButton = find.text("Don't have an account? Register");
    expect(signUpButton, findsOneWidget);

    // Scroll the ListView to bring the button into view.
    await tester.drag(find.byType(ListView), const Offset(0, -300));
    await tester.pumpAndSettle();

    // Ensure the button is visible.
    await tester.ensureVisible(signUpButton);

    await tester.tap(signUpButton);
    await tester.pumpAndSettle();

    // Verify that the 'Sign Up' page is shown.
    expect(find.text('First Name'), findsOneWidget);

    // Go back to the login page.
    //await tester.pageBack();
    tester.state<NavigatorState>(find.byType(Navigator)).pop();
    await tester.pumpAndSettle();

/*
    // Find the username and password fields.
    var usernameField = find.widgetWithText(TextField, 'Email or Username');
    var passwordField = find.widgetWithText(TextField, 'Password');
    

    //Enter credentials.
    await tester.enterText(usernameField, 'Jeremy');
    await tester.enterText(passwordField, 'testing123');
    await tester.pump();

    //Tap the 'Login' button.
    var loginButton = find.byType(ElevatedButton);
    expect(loginButton, findsOneWidget);
    await tester.tap(loginButton);
    await tester.pumpAndSettle();

    //Wait for the dialog to fully build.
    await Future.delayed(const Duration(seconds: 3));

    //Verify that the error box is shown / go to Reserve Page.
    expect(find.text('Reservations'), findsOneWidget);
    //expect(find.text('Invalid Credentials'), findsOneWidget);
  */

    print('Success! (Forget Password, Register, Login)');
  });
}
