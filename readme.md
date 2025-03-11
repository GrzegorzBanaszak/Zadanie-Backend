# Lista Zadań - API i Systemy

## 1. API do zarządzania zadaniami (TODO list)

**Opis:**  
Stwórz RESTful API do zarządzania zadaniami. Każde zadanie powinno mieć tytuł, opis, status (np. „do zrobienia”, „w trakcie”, „zakończone”) i priorytet. Powinno być możliwe dodawanie, edytowanie, usuwanie i filtrowanie zadań.

**Wymagania:**

- [x] Obsługa CRUD (Create, Read, Update, Delete).
- [x] Możliwość filtrowania po statusie i priorytecie.
- [x] Możliwość sortowania według daty utworzenia.

---

## 2. System rejestracji użytkowników z JWT

**Opis:**  
Stwórz system rejestracji i logowania użytkowników z wykorzystaniem JWT (JSON Web Token) do uwierzytelniania.

**Wymagania:**

- [x] Rejestracja użytkowników (z hashowaniem haseł).
- [x] Logowanie i generowanie tokena JWT.
- [x] Middleware do weryfikacji JWT.
- [x] Endpoint z zabezpieczoną trasą wymagającą tokena.

---

## 3. API do zarządzania książkami w bibliotece

**Opis:**  
Stwórz API do zarządzania książkami w bibliotece. Użytkownicy powinni mieć możliwość dodawania książek, wyszukiwania ich według autora lub tytułu oraz sprawdzania dostępności.

**Wymagania:**

- [x] CRUD dla książek.
- [x] Wyszukiwanie książek po tytule i autorze.
- [x] Endpoint sprawdzający, czy książka jest dostępna.

---

## 4. System ankietowy

**Opis:**  
Stwórz API umożliwiające tworzenie i wypełnianie ankiet. Każda ankieta powinna zawierać pytania i możliwe odpowiedzi.

**Wymagania:**

- [x] Tworzenie ankiety z wieloma pytaniami.
- [x] Możliwość udzielania odpowiedzi na ankiety.
- [x] Endpoint zwracający wyniki ankiety w postaci JSON.

---

## 5. System skracania linków

**Opis:**  
Stwórz API do skracania linków, podobne do bit.ly. Każdy link powinien mieć swój unikalny, krótki identyfikator.

**Wymagania:**

- [x] Przechowywanie oryginalnych i skróconych URL-i.
- [x] Endpoint do generowania skróconego linku.
- [x] Endpoint do przekierowywania użytkownika na oryginalny adres.

---

## 6. API do prognozy pogody

**Opis:**  
Stwórz API pobierające prognozę pogody z zewnętrznego serwisu (np. OpenWeatherMap) i zwracające użytkownikowi przetworzone dane.

**Wymagania:**

- [ ] Integracja z zewnętrznym API pogodowym.
- [ ] Endpoint zwracający temperaturę i warunki pogodowe dla danego miasta.
- [ ] Możliwość zapisania ostatnich wyszukiwań w bazie danych.

---

## 7. System rezerwacji spotkań

**Opis:**  
Stwórz API umożliwiające rezerwację terminów spotkań. Powinna istnieć możliwość rezerwacji przez użytkowników oraz sprawdzania dostępności terminów.

**Wymagania:**

- [ ] CRUD dla spotkań.
- [ ] Możliwość rezerwacji terminu przez użytkownika.
- [ ] Endpoint do sprawdzania dostępnych slotów czasowych.

---

## 8. API do obsługi zamówień w restauracji

**Opis:**  
Stwórz API dla restauracji, gdzie użytkownicy mogą składać zamówienia na jedzenie.

**Wymagania:**

- [ ] CRUD dla zamówień.
- [ ] Endpoint zwracający aktualny status zamówienia.
- [ ] Możliwość oznaczania zamówienia jako „gotowe do odbioru” lub „dostarczone”.

---

## 9. System powiadomień e-mail

**Opis:**  
Stwórz API, które wysyła automatyczne powiadomienia e-mail do użytkowników po spełnieniu określonych warunków (np. rejestracja, przypomnienie o spotkaniu).

**Wymagania:**

- [ ] Integracja z usługą e-mail (np. SMTP, SendGrid).
- [ ] Możliwość definiowania szablonów wiadomości.
- [ ] Obsługa wysyłki powiadomień na żądanie oraz cyklicznych.

---

## 10. API do analizy tekstu

**Opis:**  
Stwórz API umożliwiające analizę tekstu (np. liczenie słów, wykrywanie języka, sprawdzanie poprawności gramatycznej).

**Wymagania:**

- [ ] Endpoint przyjmujący tekst jako wejście.
- [ ] Możliwość analizy tekstu (np. liczba słów, wykrywanie języka).
- [ ] Integracja z zewnętrznym API do analizy tekstu (opcjonalnie).
