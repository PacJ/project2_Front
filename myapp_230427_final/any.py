import cx_Oracle
import os
import platform

print(cx_Oracle.version)

# cx_Oracle.init_oracle_client(
#     lib_dir=r"D:\k_digital\jp\instantclient-basic-windows.x64-21.9.0.0.0dbru\instantclient_21_9")

lib_dir = r"D:\k_digital\jp\instantclient-basic-windows.x64-21.9.0.0.0dbru\instantclient_21_9"

try:
    cx_Oracle.init_oracle_client(lib_dir=lib_dir)
except Exception as err:
    print("Error connecting: cx_Oracle.init_oracle_client()")
    print(err)
print(cx_Oracle.clientversion())
cx_Oracle.clientversion()
