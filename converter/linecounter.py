a = 1
while True:
    try:
        line = input()
    except EOFError:
        break
    contents.append(line)
    a += 1
    print(a)